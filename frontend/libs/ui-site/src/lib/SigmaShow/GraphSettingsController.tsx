import { useSigma } from '@react-sigma/core';
import { FC, useEffect } from 'react';
import useDebounce from '../hooks';

const NODE_FADE_COLOR = '#bbb';
const EDGE_FADE_COLOR = '#eee';

export const GraphSettingsController: FC<{
  hoveredNode: string | null;
}> = ({ children, hoveredNode }) => {
  const sigma = useSigma();

  const graph = sigma.getGraph();

  // Here we debounce the value to avoid having too much highlights refresh when
  // moving the mouse over the graph:
  const debouncedHoveredNode = useDebounce(hoveredNode, 40);

  /**
   * Update node and edge reducers when a node is hovered, to highlight its
   * neighborhood:
   */

  useEffect(() => {
    const hoveredColor: string = debouncedHoveredNode
      ? sigma.getNodeDisplayData(debouncedHoveredNode)!.color
      : '';

    sigma.setSetting(
      'nodeReducer',
      debouncedHoveredNode
        ? (node, data) =>
            node === debouncedHoveredNode ||
            graph.hasEdge(node, debouncedHoveredNode) ||
            graph.hasEdge(debouncedHoveredNode, node)
              ? { ...data, zIndex: 1, forceLabel: true }
              : {
                  ...data,
                  zIndex: 0,
                  label: '',
                  color: NODE_FADE_COLOR,
                  image: null,
                  highlighted: false,
                }
        : null
    );
    sigma.setSetting(
      'edgeReducer',
      debouncedHoveredNode
        ? (edge, data) =>
            graph.hasExtremity(edge, debouncedHoveredNode)
              ? { ...data, color: hoveredColor, size: 4 }
              : { ...data, color: EDGE_FADE_COLOR, hidden: true }
        : null
    );
  }, [debouncedHoveredNode]);

  return <>{children}</>;
};
