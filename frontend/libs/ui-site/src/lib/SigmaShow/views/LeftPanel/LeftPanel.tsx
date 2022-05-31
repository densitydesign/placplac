import { FC, useContext, useMemo } from 'react';
import { MdOutlinePreview } from 'react-icons/md';
import { GoSettings } from 'react-icons/go';

import { Filters } from '../Filters';
import GraphSumUp from '../GraphSumUp';
import NodesAppearanceBlock from '../NodesAppearanceBlock';
import { GraphContext } from '../../lib/context';
import SelectedNodePanel from '../SelectedNodePanel';
import ReadabilityBlock from '../ReadabilityBlock';
import styles from './LeftPanel.module.css';
export const LeftPanel: FC = () => {
  const { navState, data, panel, setPanel } = useContext(GraphContext);

  const selectedNode = useMemo(
    () =>
      navState?.selectedNode && data?.graph.hasNode(navState.selectedNode)
        ? data.graph.getNodeAttributes(navState.selectedNode)
        : null,
    [data?.graph, navState?.selectedNode]
  );

  let content: JSX.Element;

  if (panel === 'readability') {
    content = <ReadabilityBlock />;
  } else if (selectedNode) {
    content = (
      <SelectedNodePanel
        node={navState?.selectedNode as string}
        data={selectedNode}
      />
    );
  } else {
    content = (
      <>
        <GraphSumUp />
        <NodesAppearanceBlock />
        <Filters />
      </>
    );
  }

  return (
    <section className={styles.panel_left}>
      <div className={styles.panel_header}>
        <div className={styles.header_buttons}>
          <button
            onClick={() => setPanel('main')}
            disabled={panel === 'main'}
            title="Explore the graph"
          >
            <MdOutlinePreview /> Explore
          </button>
          <button
            onClick={() => setPanel('readability')}
            disabled={panel === 'readability'}
            title="Edit readability settings"
          >
            <GoSettings />
          </button>
        </div>
      </div>

      <div className={styles.panel_content}>
        <div>{content}</div>
      </div>
    </section>
  );
};
