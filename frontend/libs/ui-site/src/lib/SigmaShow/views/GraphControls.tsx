import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { OptionProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import cx from 'classnames';
import { keyBy, take } from 'lodash';
import { Coordinates } from 'sigma/types';
import { FullScreenControl, useSigma, ZoomControl } from '@react-sigma/core';
import { BsSearch } from 'react-icons/bs';

import { normalize } from '../utils/string';
import {
  ANIMATION_DURATION,
  DEFAULT_SELECT_PROPS,
  MAX_OPTIONS,
  RETINA_FIELD_PREFIX,
} from '../lib/consts';
import { AppContext, GraphContext } from '../lib/context';
import { NodeData } from '../lib/data';
import Node from '../components/Node';

const TYPE_NODE = 'node' as const;
const TYPE_MESSAGE = 'message' as const;

interface NodeOption {
  type: typeof TYPE_NODE;
  value: string;
  label: string;
  node: NodeData;
}
interface MessageOption {
  type: typeof TYPE_MESSAGE;
  value: string;
  label: string;
  isDisabled: true;
}
type Option = NodeOption | MessageOption;

function cropOptions(options: Option[]): Option[] {
  const moreOptionsCount = options.length - MAX_OPTIONS;
  return moreOptionsCount > 1
    ? take(options, MAX_OPTIONS).concat({
        type: TYPE_MESSAGE,
        value: RETINA_FIELD_PREFIX + 'more-values',
        label: `...and ${
          moreOptionsCount > 1
            ? moreOptionsCount + ' more nodes'
            : 'one more node'
        }`,
        isDisabled: true,
      })
    : options;
}

function doesMatch(
  normalizedQuery: string,
  searchableNormalizedStrings: string[]
): boolean {
  return searchableNormalizedStrings.some((str) =>
    str.includes(normalizedQuery)
  );
}

const OptionComponent = ({
  data,
  innerProps,
  className,
  isFocused,
}: OptionProps<Option, false>) => {
  return (
    <div
      {...innerProps}
      className={className}
      onMouseMove={undefined}
      onMouseOver={undefined}
    >
      {data.type === TYPE_NODE && (
        <Node
          node={data.value}
          attributes={data.node}
          className={cx(
            'search-node hoverable p-1',
            isFocused && 'active-node'
          )}
        />
      )}
      {data.type === TYPE_MESSAGE && (
        <div className="p-2 text-muted">{data.label}</div>
      )}
    </div>
  );
};

const IndicatorComponent = () => {
  return (
    <div className="text-center" style={{ width: '2em' }}>
      <BsSearch />
    </div>
  );
};

const GraphSearch: FC = () => {
  const sigma = useSigma();
  const { portalTarget } = useContext(AppContext);
  const {
    setNavState,
    navState,
    data,
    computedData: { filteredNodes },
  } = useContext(GraphContext);
  const [nodesIndex, setNodesIndex] = useState<Record<string, string[]>>({});

  // Index nodes on mount:
  useEffect(() => {
    setNodesIndex(
      data.graph.reduceNodes(
        (iter, node, attributes) => ({
          ...iter,
          [node]: [normalize(node), normalize(attributes.label)],
        }),
        {}
      )
    );
  }, [data.graph]);

  const options: Option[] = useMemo(
    () =>
      data.graph
        .mapNodes((node, attributes) => {
          return {
            type: TYPE_NODE,
            value: node,
            label: attributes.label,
            node: attributes,
          };
        })
        .filter((n) => !filteredNodes || filteredNodes.has(n.value)),
    [data.graph, filteredNodes]
  );
  const firstOptions = useMemo(() => cropOptions(options), [options]);
  const optionsSet = keyBy(options, 'value');
  const selectNode = useCallback(
    (option: Option | null) => {
      if (!option) {
        setNavState({ ...navState, selectedNode: undefined });
      } else {
        setNavState({ ...navState, selectedNode: option.value });
        const nodePosition = sigma.getNodeDisplayData(
          option.value
        ) as Coordinates;
        sigma.getCamera().animate(
          { ...nodePosition, ratio: 0.5 },
          {
            duration: ANIMATION_DURATION,
          }
        );
      }
    },
    [navState, setNavState, sigma]
  );
  const filterOptions = useCallback(
    (query: string, callback: (options: Option[]) => void) => {
      const normalizedQuery = normalize(query);
      callback(
        cropOptions(
          options.filter(
            (option) =>
              option.type === TYPE_NODE &&
              doesMatch(normalizedQuery, nodesIndex[option.value] || [])
          )
        )
      );
    },
    [nodesIndex, options]
  );

  return (
    <AsyncSelect<Option>
      {...DEFAULT_SELECT_PROPS}
      isClearable
      menuPortalTarget={portalTarget}
      className="mb-2"
      placeholder="Search for nodes..."
      defaultOptions={firstOptions}
      loadOptions={filterOptions}
      value={
        navState.selectedNode ? optionsSet[navState.selectedNode] || null : null
      }
      onChange={(option: Option | null) =>
        selectNode(option?.type === TYPE_NODE ? option : null)
      }
      components={{
        Option: OptionComponent,
        DropdownIndicator: IndicatorComponent,
      }}
      styles={{
        control: (styles) => {
          return {
            ...styles,
            width: '200px',
          };
        },
      }}
    />
  );
};

const GraphControls: FC = () => {
  const sigma = useSigma();

  return (
    <>
      <GraphSearch />
      <ZoomControl />
      <FullScreenControl />
    </>
  );
};

export default GraphControls;
