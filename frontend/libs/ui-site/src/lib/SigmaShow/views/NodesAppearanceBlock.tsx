import React, { FC, useContext, useMemo } from 'react';
import cx from 'classnames';
import Select from 'react-select';
import { BsPaletteFill } from 'react-icons/bs';
import { MdBubbleChart } from 'react-icons/md';

import { AppContext, GraphContext } from '../lib/context';
import { DEFAULT_SELECT_PROPS } from '../lib/consts';

interface Option {
  value: string;
  label: string;
  field?: string;
}

const NodesAppearanceBlock: FC = () => {
  const { portalTarget } = useContext(AppContext);
  const { navState, data, setNavState } = useContext(GraphContext);
  const { fieldsIndex } = data;
  const {
    role,
    nodeColorField,
    nodeSizeField,
    colorable,
    sizeable,
    disableDefaultColor,
    disableDefaultSize,
  } = navState;

  const colorOptions: Option[] = useMemo(
    () => [
      ...(disableDefaultColor
        ? []
        : [
            {
              value: 'none',
              label: 'Default (use colors from the graph file)',
            },
          ]),
      ...(colorable || []).map((key) => {
        const field = fieldsIndex[key];
        return {
          value: `${key}-field`,
          label: field.label,
          field: key,
        };
      }),
    ],
    [colorable, fieldsIndex, disableDefaultColor]
  );
  const colorOption = nodeColorField
    ? colorOptions.find((o) => o.field === nodeColorField) || colorOptions[0]
    : colorOptions[0];

  const sizeOptions: Option[] = useMemo(
    () => [
      ...(disableDefaultSize
        ? []
        : [
            { value: 'none', label: 'Default (use sizes from the graph file)' },
          ]),
      ...(sizeable || []).map((key) => {
        const field = fieldsIndex[key];
        return {
          value: `${key}-field`,
          label: field.label,
          field: key,
        };
      }),
    ],
    [sizeable, fieldsIndex, disableDefaultSize]
  );
  const sizeOption = nodeSizeField
    ? sizeOptions.find((o) => o.field === nodeSizeField) || sizeOptions[0]
    : sizeOptions[0];
  const showSizes = sizeOptions.length > 1;
  const showColors = colorOptions.length > 1;

  if (!showSizes && !showColors) return null;
  if (role === 'v') return null;
  console.log(sizeOptions);
  return (
    <div>
      {showColors && (
        <div>
          <label htmlFor="color-field-input" className="form-label">
            <h3>
              <BsPaletteFill /> Color nodes by...
            </h3>
          </label>
          <Select
            {...DEFAULT_SELECT_PROPS}
            inputId="color-field-input"
            menuPortalTarget={portalTarget}
            options={colorOptions}
            value={colorOption}
            onChange={(o) =>
              setNavState({ ...navState, nodeColorField: o?.field })
            }
            isDisabled={colorOptions.length <= 1}
          />
        </div>
      )}

      {showSizes && (
        <div>
          <label htmlFor="size-field-input" className="form-label">
            <h3>
              <MdBubbleChart /> Size nodes by...
            </h3>
          </label>
          <Select
            {...DEFAULT_SELECT_PROPS}
            inputId="size-field-input"
            menuPortalTarget={portalTarget}
            options={sizeOptions}
            value={sizeOption}
            onChange={(o) =>
              setNavState({ ...navState, nodeSizeField: o?.field })
            }
            isDisabled={sizeOptions.length <= 1}
          />
        </div>
      )}
    </div>
  );
};

export default NodesAppearanceBlock;
