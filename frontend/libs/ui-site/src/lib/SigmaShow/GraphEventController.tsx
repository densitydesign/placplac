import { useRegisterEvents, useSigma } from '@react-sigma/core';
import { FC, useEffect } from 'react';

function getMouseLayer() {
  return document.querySelector('.sigma-mouse');
}

export const GraphEventsController: FC<{
  setHoveredNode: (node: string | null) => void;
}> = ({ setHoveredNode, children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const registerEvents = useRegisterEvents();

  /**
   * Initialize here settings that require to know the graph and/or the sigma
   * instance:
   */
  useEffect(() => {
    registerEvents({
      enterNode({ node }) {
        setHoveredNode(node);

        const mouseLayer = getMouseLayer();
        if (mouseLayer) mouseLayer.classList.add('mouse-pointer');
      },
      leaveNode() {
        setHoveredNode(null);

        const mouseLayer = getMouseLayer();
        if (mouseLayer) mouseLayer.classList.remove('mouse-pointer');
      },
    });
  }, []);

  return <>{children}</>;
};
