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
import { GraphEventsController } from './GraphEventController';
import { GraphSettingsController } from './GraphSettingsController';
import { useSize } from '../hooks';

interface SigmaGraphProps {
  gexfPath: string;
  hasControls?: boolean;
}
export const LoadGraph = (props: SigmaGraphProps) => {
  const { gexfPath } = props;
  const { sigma, container } = useSigmaContext();
  const size = useSize(container);
  const loadGraph = useLoadGraph();

  useEffect(() => {
    fetch(gexfPath)
      .then((res) => res.text())
      .then((gexf) => {
        const graph = parse(Graph, gexf);
        loadGraph(graph);
      });
  }, [loadGraph, gexfPath]);

  useEffect(() => {
    sigma.refresh();
  }, [size]);
  return null;
};

export const SigmaGraph = (props: SigmaGraphProps) => {
  const { gexfPath, hasControls = true } = props;
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  return (
    <SigmaContainer
      initialSettings={{
        zIndex: true,
        allowInvalidContainer: true,
      }}
      style={{ height: '100%', width: '100%' }}
    >
      <LoadGraph gexfPath={gexfPath} />
      <GraphEventsController setHoveredNode={setHoveredNode} />
      <GraphSettingsController hoveredNode={hoveredNode} />
      {hasControls && (
        <>
          <ControlsContainer position={'top-left'}>
            <SearchControl style={{ padding: '10px' }} />
          </ControlsContainer>
          <ControlsContainer position={'bottom-right'}>
            <ZoomControl />
            <FullScreenControl />
          </ControlsContainer>
        </>
      )}
    </SigmaContainer>
  );
};
