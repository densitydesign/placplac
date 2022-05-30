import { isEqual } from 'lodash';
import React, { FC, useContext, useState } from 'react';
import { FaTimes, FaUndo } from 'react-icons/fa';
import Slider, { SliderProps } from 'rc-slider';
import { GoSettings } from 'react-icons/go';
import cx from 'classnames';

import { GraphContext } from '../lib/context';
import {
  DEFAULT_EDGE_SIZE_RATIO,
  DEFAULT_LABEL_SIZE,
  DEFAULT_LABEL_THRESHOLD,
  DEFAULT_NODE_SIZE_RATIO,
  LABEL_SIZE_STEP,
  LABEL_THRESHOLD_STEP,
  MAX_LABEL_SIZE,
  MAX_LABEL_THRESHOLD,
  MAX_NODE_SIZE_RATIO,
  MIN_LABEL_SIZE,
  MIN_LABEL_THRESHOLD,
  MIN_NODE_SIZE_RATIO,
  NODE_SIZE_RATIO_STEP,
  RANGE_STYLE,
  SLIDER_STYLE,
} from '../lib/consts';
import { NavState } from '../lib/navState';

const ReadabilityBlock: FC = () => {
  const { navState, setNavState } = useContext(GraphContext);

  const [initialNavState] = useState<NavState>(navState);

  const minLabelSize =
    typeof navState.minLabelSize === 'number'
      ? navState.minLabelSize
      : DEFAULT_LABEL_SIZE;
  const maxLabelSize =
    typeof navState.maxLabelSize === 'number'
      ? navState.maxLabelSize
      : DEFAULT_LABEL_SIZE;
  const nodeSizeRatio =
    typeof navState.nodeSizeRatio === 'number'
      ? navState.nodeSizeRatio
      : DEFAULT_NODE_SIZE_RATIO;
  const edgeSizeRatio =
    typeof navState.edgeSizeRatio === 'number'
      ? navState.edgeSizeRatio
      : DEFAULT_EDGE_SIZE_RATIO;
  const labelThresholdRatio =
    typeof navState.labelThresholdRatio === 'number'
      ? navState.labelThresholdRatio
      : DEFAULT_LABEL_THRESHOLD;

  const cancel = () => setNavState(initialNavState);

  return (
    <div>
      <h1>
        <GoSettings /> Readability settings
      </h1>

      <br />

      <div>
        <button
          type="submit"
          onClick={cancel}
          disabled={isEqual(navState, initialNavState)}
        >
          <FaUndo /> Cancel modifications
        </button>
      </div>

      <br />

      <div style={{ marginBottom: '1rem' }}>
        <h3
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label style={{ flex: '1 auto' }}>
            Label sizes <small>(select min and max)</small>
          </label>
          <button
            disabled={
              typeof navState.minLabelSize !== 'number' &&
              typeof navState.maxLabelSize !== 'number'
            }
            onClick={() =>
              setNavState({
                ...navState,
                minLabelSize: undefined,
                maxLabelSize: undefined,
              })
            }
          >
            <FaTimes /> Restore default
          </button>
        </h3>
        <div style={{ paddingBottom: '1rem' }}>
          <Slider
            range
            value={[minLabelSize, maxLabelSize]}
            min={MIN_LABEL_SIZE}
            max={MAX_LABEL_SIZE}
            step={LABEL_SIZE_STEP}
            marks={{
              [MIN_LABEL_SIZE]: MIN_LABEL_SIZE,
              [MAX_LABEL_SIZE]: MAX_LABEL_SIZE,
              [minLabelSize]: minLabelSize,
              [maxLabelSize]: maxLabelSize,
            }}
            onChange={
              (([minLabelSize, maxLabelSize]: number[]) => {
                setNavState({ ...navState, minLabelSize, maxLabelSize });
              }) as SliderProps['onChange']
            }
            // Styles:
            {...RANGE_STYLE}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label style={{ flex: '1 auto' }}>Node sizes</label>
          <button
            disabled={typeof navState.nodeSizeRatio !== 'number'}
            onClick={() =>
              setNavState({ ...navState, nodeSizeRatio: undefined })
            }
          >
            <FaTimes /> Restore default
          </button>
        </h3>
        <div style={{ paddingBottom: '1rem' }}>
          <Slider
            value={nodeSizeRatio}
            min={MIN_NODE_SIZE_RATIO}
            max={MAX_NODE_SIZE_RATIO}
            step={NODE_SIZE_RATIO_STEP}
            marks={{
              [MIN_NODE_SIZE_RATIO]: MIN_NODE_SIZE_RATIO,
              [MAX_NODE_SIZE_RATIO]: MAX_NODE_SIZE_RATIO,
              [nodeSizeRatio]: nodeSizeRatio,
            }}
            onChange={
              ((v: number) => {
                setNavState({ ...navState, nodeSizeRatio: v });
              }) as SliderProps['onChange']
            }
            // Styles:
            {...SLIDER_STYLE}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label style={{ flex: '1 auto' }}>Edge sizes</label>
          <button
            className={cx(
              'btn btn-ico btn-sm btn-outline-dark',
              typeof navState.edgeSizeRatio !== 'number' && 'hidden'
            )}
            disabled={typeof navState.edgeSizeRatio !== 'number'}
            onClick={() =>
              setNavState({ ...navState, edgeSizeRatio: undefined })
            }
          >
            <FaTimes /> Restore default
          </button>
        </h3>
        <div style={{ paddingBottom: '1rem' }}>
          <Slider
            value={edgeSizeRatio}
            min={MIN_NODE_SIZE_RATIO}
            max={MAX_NODE_SIZE_RATIO}
            step={NODE_SIZE_RATIO_STEP}
            marks={{
              [MIN_NODE_SIZE_RATIO]: MIN_NODE_SIZE_RATIO,
              [MAX_NODE_SIZE_RATIO]: MAX_NODE_SIZE_RATIO,
              [edgeSizeRatio]: edgeSizeRatio,
            }}
            onChange={
              ((v: number) => {
                setNavState({ ...navState, edgeSizeRatio: v });
              }) as SliderProps['onChange']
            }
            // Styles:
            {...SLIDER_STYLE}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label style={{ flex: '1 auto' }}>Labels on screen</label>
          <button
            className={cx(
              'btn btn-ico btn-sm btn-outline-dark',
              typeof navState.labelThresholdRatio !== 'number' && 'hidden'
            )}
            disabled={typeof navState.labelThresholdRatio !== 'number'}
            onClick={() =>
              setNavState({ ...navState, labelThresholdRatio: undefined })
            }
          >
            <FaTimes /> Restore default
          </button>
        </h3>
        <div style={{ paddingBottom: '1rem' }}>
          <Slider
            value={labelThresholdRatio}
            min={MIN_LABEL_THRESHOLD}
            max={MAX_LABEL_THRESHOLD}
            step={LABEL_THRESHOLD_STEP}
            marks={{
              [MIN_LABEL_THRESHOLD]: {
                label: '(less labels)',
                style: {
                  transform: 'translateX(0)',
                },
              },
              [MAX_LABEL_THRESHOLD]: {
                label: '(more labels)',
                style: {
                  whiteSpace: 'nowrap',
                  transform: 'translateX(-100%)',
                },
              },
            }}
            onChange={
              ((v: number) => {
                setNavState({ ...navState, labelThresholdRatio: v });
              }) as SliderProps['onChange']
            }
            // Styles:
            {...SLIDER_STYLE}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadabilityBlock;
