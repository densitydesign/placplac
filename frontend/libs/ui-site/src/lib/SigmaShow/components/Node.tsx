import React, { FC, useContext } from "react";
import cx from "classnames";

import { GraphContext } from "../lib/context";
import { navStateToQueryURL } from "../lib/navState";
import { NodeData } from "../lib/data";
import { navigate } from "../views/useLocation";

const Node: FC<{
  node: string;
  attributes: NodeData;
  link?: boolean;
  className?: string;
}> = ({ node, attributes, link, className }) => {
  const {
    navState,
    setHovered,
    computedData: { filteredNodes },
  } = useContext(GraphContext);
  const baseClassName = "node fs-6 d-flex flex-row align-items-center";

  const content = (
    <>
      <span
        className={cx("me-2 flex-shrink-0", filteredNodes && !filteredNodes.has(node) ? "circle" : "disc")}
        style={{
          background: attributes.color,
        }}
      />
      <span className="ellipsis">{attributes.label}</span>
    </>
  );

  return link ? (
    <span
      onClick={() => navigate("/graph/?" + navStateToQueryURL({ ...navState, selectedNode: node }))}
      className={cx(baseClassName, className)}
      onMouseEnter={() => setHovered(node)}
      onMouseLeave={() => setHovered(undefined)}
      title={attributes.label || undefined}
    >
      {content}
    </span>
  ) : (
    <div className={cx(baseClassName, className)} title={attributes.label || undefined}>
      {content}
    </div>
  );
};

export default Node;
