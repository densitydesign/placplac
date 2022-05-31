import { FC, useContext } from 'react';
import { RiFilterOffFill } from 'react-icons/ri';
import { BiNetworkChart } from 'react-icons/bi';

import { GraphContext } from '../lib/context';

const GraphSumUp: FC = () => {
  const { origin, pathname } = window.location;
  const { navState, data, computedData, setNavState } =
    useContext(GraphContext);

  const { graph } = data;
  const { filteredNodes, filteredEdges } = computedData;

  const nodesTotal = graph.order;
  const edgesTotal = graph.size;
  const nodesVisible = filteredNodes ? filteredNodes.size : nodesTotal;
  const edgesVisible = filteredEdges ? filteredEdges.size : edgesTotal;
  const hasFilter = nodesVisible < nodesTotal;

  return (
    <div>
      <h1>
        <BiNetworkChart /> Graph overview
      </h1>

      <br />

      <h3 style={{ marginTop: '0' }}>
        {nodesVisible.toLocaleString()} node{nodesVisible > 1 ? 's' : ''}
        {hasFilter ? (
          <small style={{ marginLeft: '0.4rem' }}>
            {((nodesVisible / nodesTotal) * 100).toFixed(1)}% of full graph
          </small>
        ) : null}
      </h3>
      <h3 style={{ marginTop: '0' }}>
        {edgesVisible.toLocaleString()} edge{edgesVisible > 1 ? 's' : ''}
        {hasFilter ? (
          <small style={{ marginLeft: '0.4rem' }}>
            {((edgesVisible / edgesTotal) * 100).toFixed(1)}% of full graph
          </small>
        ) : null}
      </h3>

      <br />

      <div>
        {navState.role !== 'v' && (
          <button
            disabled={!navState.filters}
            onClick={() => setNavState({ ...navState, filters: undefined })}
          >
            <RiFilterOffFill /> Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default GraphSumUp;
