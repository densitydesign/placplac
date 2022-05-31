import React, { FC, useContext, useEffect, useState } from "react";
import { useSigma } from "@react-sigma/core";

import { GraphContext } from "../lib/context";
import {
  applyEdgeColors,
  applyEdgeDirections,
  applyEdgeSizes,
  applyNodeColors,
  applyNodeLabelSizes,
  applyNodeSizes,
  applyNodeSubtitles,
  getReducers,
} from "../lib/graph";
import { DEFAULT_SETTINGS } from "sigma/settings";
import { inputToStateThreshold } from "../utils/threshold";
import { DEFAULT_LABEL_THRESHOLD } from "../lib/consts";
import { LoaderFill } from "../components/Loader";
import drawLabel, { drawHover } from "../utils/canvas";

const GraphAppearance: FC = () => {
  const { data, navState, computedData, setSigma, hovered } = useContext(GraphContext);
  const {
    nodeSizeField,
    minLabelSize,
    maxLabelSize,
    subtitleFields,
    nodeSizeRatio,
    edgeSizeRatio,
    edgeColoring,
    edgeDirection,
  } = navState;
  const labelThreshold = inputToStateThreshold(navState.labelThresholdRatio || DEFAULT_LABEL_THRESHOLD);
  const { nodeColors, nodeSizes, edgeSizes, nodeSizeExtents } = computedData;
  const sigma = useSigma();

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setSigma(sigma);
    sigma.setSetting("labelRenderer", (context, data, settings) =>
      drawLabel(context, { ...sigma.getNodeDisplayData(data.key), ...data }, settings),
    );
    sigma.setSetting("hoverRenderer", (context, data, settings) =>
      drawHover(context, { ...sigma.getNodeDisplayData(data.key), ...data }, settings),
    );

    return () => setSigma(undefined);
  }, [sigma, setSigma]);

  useEffect(() => {
    const { node, edge } = getReducers(data, navState, computedData, hovered);
    sigma.setSetting("nodeReducer", node);
    sigma.setSetting("edgeReducer", edge);
    sigma.refresh();
    setIsRendered(true);
  }, [data, navState, computedData, hovered, sigma]);

  useEffect(() => {
    const labelDensity = labelThreshold === 0 ? Infinity : DEFAULT_SETTINGS.labelDensity;
    sigma.setSetting("labelRenderedSizeThreshold", labelThreshold);
    sigma.setSetting("labelDensity", labelDensity);
    sigma.refresh();
  }, [labelThreshold, sigma]);

  useEffect(() => {
    applyNodeColors(data, { nodeColors });
  }, [sigma, data, nodeColors]);

  useEffect(() => {
    applyNodeSizes(data, { nodeSizes }, { nodeSizeRatio });
  }, [sigma, data, nodeSizeRatio, nodeSizes]);

  useEffect(() => {
    applyNodeLabelSizes(data, { nodeSizeExtents }, { nodeSizeField, minLabelSize, maxLabelSize });
  }, [sigma, data, nodeSizeField, minLabelSize, maxLabelSize, nodeSizeExtents]);

  useEffect(() => {
    applyNodeSubtitles(data, { subtitleFields });
  }, [sigma, data, subtitleFields]);

  useEffect(() => {
    applyEdgeColors(data, { nodeColors }, { edgeColoring });
  }, [sigma, data, nodeColors, edgeColoring]);

  useEffect(() => {
    applyEdgeDirections(data, { edgeDirection });
  }, [sigma, data, edgeDirection]);

  useEffect(() => {
    applyEdgeSizes(data, { edgeSizes }, { edgeSizeRatio });
  }, [sigma, data, edgeSizes, edgeSizeRatio]);

  return isRendered ? null : <LoaderFill />;
};

export default GraphAppearance;
