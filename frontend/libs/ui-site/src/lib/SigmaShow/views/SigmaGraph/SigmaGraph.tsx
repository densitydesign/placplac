import { useEffect, useState } from 'react';
import Graph from 'graphology';
import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  useLoadGraph,
  useSigmaContext,
  ZoomControl,
} from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';
import { parse } from 'graphology-gexf/browser';
import cx from 'classnames';
import 'rc-slider/assets/index.css';

import { useCallback, useMemo, useRef } from 'react';
import Sigma from 'sigma';
import { Dimensions } from 'sigma/types';
import styles from './SigmaGraph.module.css';
import {
  Data,
  enrichData,
  loadGraphURL,
  readGraph,
  prepareGraph,
} from '../../lib/data';
import { LoaderFill } from '../../components/Loader';

import {
  cleanNavState,
  guessNavState,
  NavState,
  navStateToQueryURL,
  queryURLToNavState,
} from '../../lib/navState';
import {
  ComputedData,
  getNodeColors,
  getMetrics,
  getNodeSizes,
  getEmptyComputedData,
  getEdgeSizes,
} from '../../lib/computedData';
import { GraphContext, Panel } from '../../lib/context';
import { applyGraphStyle } from '../../lib/graph';
import { navigate, useLocation } from '../useLocation';
import { LeftPanel } from '../LeftPanel';
import { hiddenReducer } from '../../lib/consts';
import BorderedNodeProgram from '../../utils/node-renderer/BorderedNodeProgram';
import EventsController from '../EventsController';
import GraphAppearance from '../GraphAppearance';
import GraphControls from '../GraphControls';
import NodeSizeCaption from '../NodeSizeCaption';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { useSize } from '../../../hooks';
interface SigmaGraphProps {
  gexfPath: string;
  hasControls?: boolean;
}

export const SigmaGraph = (props: SigmaGraphProps) => {
  const { gexfPath, hasControls = true } = props;
  const location = useLocation();
  const domRoot = useRef<HTMLElement>(null);
  const size = useSize(domRoot.current);

  const [sigma, setSigma] = useState<Sigma | undefined>(undefined);
  useEffect(() => {
    if (sigma) sigma.refresh();
  }, [size, sigma]);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 1000,
    height: 1000,
  });
  const [hovered, setHovered] = useState<string | Set<string> | undefined>(
    undefined
  );
  const [graphFile, setGraphFile] = useState<{
    name: string;
    extension: string;
    textContent: string;
  } | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const rawNavState = useMemo(
    () => queryURLToNavState(location.search),
    [location.search]
  );

  const [panel, setPanel] = useState<Panel>('main');
  const [panelExpanded, setPanelExpanded] = useState(true);

  const local = useMemo(() => rawNavState.local, [rawNavState]);
  const navState = useMemo(
    () => (data ? cleanNavState(rawNavState, data) : null),
    [rawNavState, data]
  );
  const setNavState = useCallback(
    (newNavState: NavState) => {
      navigate(
        location.hash.replace(/^#/, '').replace(/\?.*/, '') +
          '?' +
          navStateToQueryURL(
            data ? cleanNavState(newNavState, data) : newNavState
          )
      );
    },
    [data, location.hash]
  );

  const [computedData, setComputedData] = useState<ComputedData | null>(null);

  // Refresh aggregations and filtered items lists:
  useEffect(() => {
    if (data) {
      setComputedData((old) => ({
        nodeSizes: {},
        edgeSizes: {},
        nodeSizeExtents: [0, Infinity],
        edgeSizeExtents: [0, Infinity],
        ...old,
        ...getMetrics(
          data,
          {
            filters: navState?.filters,
            filterable: navState?.filterable,
            colorable: navState?.colorable,
            sizeable: navState?.sizeable,
          },
          old?.metrics
        ),
      }));
    }
  }, [
    sigma,
    data,
    navState?.filters,
    navState?.filterable,
    navState?.colorable,
    navState?.sizeable,
  ]);

  // On first computedData update, apply graph style:
  useEffect(() => {
    if (data && computedData && navState && !sigma) {
      applyGraphStyle(data, computedData, navState);
    }
  }, [sigma, data, navState, computedData]);

  // Keep dimensions up to date:
  useEffect(() => {
    if (!sigma) return;

    const handler = () => setDimensions(sigma.getDimensions());
    sigma.on('resize', handler);
    return () => {
      sigma.off('resize', handler);
    };
  }, [sigma]);

  // Refresh node colors and sizes:
  useEffect(() => {
    if (data) {
      setComputedData((current) => ({
        ...(current || getEmptyComputedData()),
        ...getNodeColors(data, { nodeColorField: navState?.nodeColorField }),
      }));
    }
  }, [data, navState?.nodeColorField]);
  useEffect(() => {
    if (data) {
      setComputedData((current) => ({
        ...(current || getEmptyComputedData()),
        ...getNodeSizes(
          data,
          {
            nodeSizeField: navState?.nodeSizeField,
            nodeSizeRatio: navState?.nodeSizeRatio,
          },
          dimensions
        ),
      }));
    }
  }, [data, navState?.nodeSizeField, navState?.nodeSizeRatio, dimensions]);
  useEffect(() => {
    if (data) {
      setComputedData((current) => ({
        ...(current || getEmptyComputedData()),
        ...getEdgeSizes(
          data,
          { edgeSizeRatio: navState?.edgeSizeRatio },
          dimensions
        ),
      }));
    }
  }, [data, navState?.edgeSizeRatio, dimensions]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let promise:
      | Promise<{
          name: string;
          extension: string;
          textContent: string;
        }>
      | undefined;

    promise = loadGraphURL(gexfPath as string);

    if (promise) {
      promise
        .then(({ name, extension, textContent }) => {
          setGraphFile({ name, extension, textContent });
          return readGraph({ name, extension, textContent });
        })
        .then((rawGraph) => prepareGraph(rawGraph))
        .then(({ graph, report }) => {
          const richData = enrichData(graph);
          setData(richData);
          setNavState({
            ...rawNavState,
            ...guessNavState(richData, report),
          });
        });
    }
  }, [gexfPath, local]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!data || !graphFile || !navState || !computedData) return <LoaderFill />;
  return (
    <GraphContext.Provider
      value={{
        embedMode: false,
        data,

        navState,
        computedData,
        graphFile,
        setNavState,
        hovered,
        setHovered,
        panel,
        setPanel,
        sigma,
        setSigma,
        root: domRoot.current || undefined,
      }}
    >
      <main
        className={cx(
          styles.graph_view,
          panelExpanded ? styles.expanded : styles.collapsed
        )}
        ref={domRoot}
      >
        <div className={styles.wrapper}>
          {hasControls && <LeftPanel />}

          <section className={styles.graph}>
            <SigmaContainer
              className={styles.sigma_wrapper}
              graph={data.graph}
              initialSettings={{
                allowInvalidContainer: true,
                labelFont: '"Public Sans", sans-serif',
                zIndex: true,
                defaultNodeType: 'borderedNode',
                nodeReducer: hiddenReducer,
                edgeReducer: hiddenReducer,

                nodeProgramClasses: {
                  borderedNode: BorderedNodeProgram,
                },
              }}
            >
              <GraphAppearance />
              {hasControls && (
                <>
                  <div className={styles.controls}>
                    <GraphControls />
                  </div>

                  <div className={styles.captions}>
                    <NodeSizeCaption />
                  </div>
                  <EventsController />
                </>
              )}
            </SigmaContainer>
          </section>
        </div>

        {hasControls && (
          <button
            className={styles.toggle_button}
            onClick={() => setPanelExpanded((v) => !v)}
            title="Toggle side panel"
          >
            {panelExpanded ? <BsChevronDoubleLeft /> : <BsChevronDoubleRight />}
          </button>
        )}
      </main>
    </GraphContext.Provider>
  );
};
