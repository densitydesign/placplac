import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Slider, { SliderProps } from 'rc-slider';
import {
  first,
  isNumber,
  keyBy,
  last,
  mapValues,
  max,
  mean,
  sortBy,
  take,
  uniq,
} from 'lodash';
import { MdBubbleChart } from 'react-icons/md';
import { RiFilterOffFill } from 'react-icons/ri';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { BiCheckbox, BiCheckboxChecked, BiCheckboxMinus } from 'react-icons/bi';
import {
  BsChevronDown,
  BsChevronUp,
  BsPaletteFill,
  BsSearch,
  BsSortAlphaDown,
  BsSortDown,
} from 'react-icons/bs';
import AnimateHeight from 'react-animate-height';
import cx from 'classnames';

import {
  ContentField,
  getFilterableFields,
  getValue,
  QualiField,
  QuantiField,
} from '../../lib/data';
import {
  Filter,
  RangeFilter,
  SearchFilter,
  TermsFilter,
} from '../../lib/navState';
import {
  RangeMetric,
  SearchMetrics,
  TermsMetric,
} from '../../lib/computedData';
import { GraphContext } from '../../lib/context';
import { MAX_PALETTE_SIZE, RANGE_STYLE } from '../../lib/consts';
import { getFontColor } from '../../utils/color';
import { shortenNumber } from '../../utils/number';
import { normalize } from '../../utils/string';
import styles from './Filters.module.css';
const SearchFilterComponent: FC<{
  field: ContentField;
  data: SearchMetrics;
  filter?: SearchFilter | undefined;
  setFilter: (filter: SearchFilter | null) => void;
}> = ({ field, data, filter, setFilter }) => {
  const [value, setValue] = useState<string>(filter?.value || '');

  useEffect(() => {
    setValue(filter?.value || '');
  }, [filter?.value]);

  return (
    <form
      className={styles.search_filter_form}
      onSubmit={(e) => {
        e.preventDefault();
        setFilter(
          value
            ? {
                type: 'search',
                field: field.id,
                value: value,
                normalizedValue: normalize(value),
              }
            : null
        );
      }}
    >
      <button type="submit">
        <BsSearch /> Filter
      </button>
      <input
        type="text"
        id={`search-filter-${field.id}`}
        value={value}
        placeholder={data.samples.join(', ') + '...'}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

const TermsFilterComponent: FC<{
  field: QualiField;
  data: TermsMetric;
  filter?: TermsFilter | undefined;
  setFilter: (filter: TermsFilter | null) => void;
  getColor?: ((value: any) => string) | null;
  editable: boolean;
}> = ({ field, data, filter, setFilter, getColor, editable }) => {
  const { data: graphData, setHovered } = useContext(GraphContext);
  const [alphaSort, setAlphaSort] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const maxCount = max(data.values.map((v) => v.globalCount)) as number;
  const filteredValues = filter?.values ? new Set(filter.values) : null;

  const showExpandToggle = data.values.length > MAX_PALETTE_SIZE;
  const values = useMemo(
    () =>
      take(
        alphaSort
          ? sortBy(data.values, (value) => value.label.toLowerCase())
          : data.values,
        showExpandToggle && !expanded ? MAX_PALETTE_SIZE : Infinity
      ),
    [showExpandToggle, expanded, alphaSort, data.values]
  );

  return (
    <>
      <div>
        <button onClick={() => setAlphaSort((v) => !v)}>
          {alphaSort ? (
            <>
              <BsSortDown /> Sort by values
            </>
          ) : (
            <>
              <BsSortAlphaDown /> Sort alphabetically
            </>
          )}
        </button>
      </div>
      <ul className={styles.term_list}>
        {values.map((v) => {
          const id = `terms-filters-${field.id}-${v.id}`;
          const state = !filteredValues
            ? 'idle'
            : filteredValues.has(v.id)
            ? 'checked'
            : 'unchecked';

          return (
            <li
              key={id}
              onClick={() => {
                if (!editable) return;

                const checkedValues = filter
                  ? filter.values
                  : data.values.map((v) => v.id);
                const newValues =
                  state === 'idle'
                    ? [v.id]
                    : state === 'unchecked'
                    ? checkedValues.concat(v.id)
                    : checkedValues.filter((s) => s !== v.id);

                if (newValues.length) {
                  setFilter({
                    field: field.id,
                    type: 'terms',
                    values: newValues,
                  });
                } else {
                  setFilter(null);
                }
              }}
              onMouseEnter={() => {
                setHovered(
                  new Set(
                    graphData.graph.filterNodes(
                      (node, nodeData) => getValue(nodeData, field) === v.id
                    )
                  )
                );
              }}
              onMouseLeave={() => {
                setHovered(undefined);
              }}
            >
              <div className="value">
                {state === 'idle' ? (
                  <BiCheckboxMinus />
                ) : state === 'checked' ? (
                  <BiCheckboxChecked />
                ) : (
                  <BiCheckbox />
                )}
                <span>
                  {v.label}{' '}
                  {v.filteredCount > 0 && (
                    <small>
                      ({v.filteredCount} node{v.filteredCount > 1 ? 's' : ''})
                    </small>
                  )}
                </span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.global}
                  style={{ width: (v.globalCount / maxCount) * 100 + '%' }}
                />
                <div
                  className={styles.filtered}
                  style={{
                    width: (v.filteredCount / maxCount) * 100 + '%',
                    background: getColor ? getColor(v.id) : undefined,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {showExpandToggle && (
        <button onClick={() => setExpanded((v) => !v)}>
          {expanded ? (
            <>
              <FiMinus /> Only show {MAX_PALETTE_SIZE} first values
            </>
          ) : (
            <>
              <FiPlus /> Show all values ({data.values.length - values.length}{' '}
              more)
            </>
          )}
        </button>
      )}
    </>
  );
};

const RangeFilterComponent: FC<{
  field: QuantiField;
  data: RangeMetric;
  filter?: RangeFilter | undefined;
  setFilter: (filter: RangeFilter | null) => void;
  getColor?: ((value: any) => string) | null;
  editable: boolean;
}> = ({ field, data, filter, setFilter, getColor, editable }) => {
  const { ranges, unit } = data;
  const absMin = first(ranges)!.min;
  const absMax = last(ranges)!.max;
  const currentMin = typeof filter?.min === 'number' ? filter.min : absMin;
  const currentMax = typeof filter?.max === 'number' ? filter.max : absMax;
  const maxCount = Math.max(...ranges.map((r) => r.globalCount));
  const marks: SliderProps['marks'] = mapValues(
    keyBy(
      uniq(
        ranges.flatMap((r) => [r.min, r.max]).concat([currentMin, currentMax])
      )
    ),
    (v) =>
      v === currentMin || v === currentMax
        ? {
            label: shortenNumber(v),
            style: {
              fontWeight: 'bold',
              background: 'white',
              padding: '0 0.2em',
              zIndex: 1,
            },
          }
        : shortenNumber(v as number)
  );
  const [inputValues, setInputValues] = useState<{ min: number; max: number }>({
    min: currentMin,
    max: currentMax,
  });

  useEffect(() => {
    setInputValues({ min: currentMin, max: currentMax });
  }, [currentMin, currentMax]);

  const updateFilter = ([min, max]: number[]) => {
    const newMin = min <= absMin ? undefined : min;
    const newMax = max >= absMax ? undefined : max;

    if (!isNumber(newMin) && !isNumber(newMax)) {
      setFilter(null);
    } else {
      const newFilter: RangeFilter = {
        field: field.id,
        type: 'range',
      };
      if (isNumber(newMin)) newFilter.min = newMin;
      if (isNumber(newMax)) newFilter.max = newMax;

      setFilter(newFilter);
    }
  };

  return (
    <div>
      <ul className={styles.range_filter_list}>
        {ranges.map((range) => {
          const filteredHeight = (range.filteredCount / maxCount) * 100;
          const isLabelInside = filteredHeight > 90;
          const bgColor = getColor
            ? getColor(mean([range.min, range.max]))
            : '#343a40';
          const fontColor = getFontColor(bgColor);

          return (
            <div className={styles.bar} key={range.min}>
              <div
                className={styles.global}
                style={{ height: (range.globalCount / maxCount) * 100 + '%' }}
              />
              <div
                className={styles.filtered}
                style={{
                  height: filteredHeight + '%',
                  background: bgColor,
                }}
              >
                {!!range.filteredCount && (
                  <span
                    className={cx(
                      styles.label,
                      isLabelInside ? styles.inside : styles.outside
                    )}
                    style={isLabelInside ? { color: fontColor } : undefined}
                  >
                    {shortenNumber(range.filteredCount)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </ul>

      <Slider
        range
        className="pb-4 mb-3"
        style={{ paddingBottom: '1.5rem', marginBottom: '1rem' }}
        value={[currentMin, currentMax]}
        min={absMin}
        max={absMax}
        step={unit}
        marks={marks}
        dots
        disabled={!editable}
        onChange={updateFilter as SliderProps['onChange']}
        // Styles:
        {...RANGE_STYLE}
      />

      {editable && (
        <form
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            updateFilter([inputValues.min, inputValues.max]);
          }}
        >
          <span>
            Filter from{' '}
            <input
              type="number"
              className="input-inline"
              step="any"
              min={absMin}
              max={inputValues.max}
              value={inputValues.min}
              onChange={(e) =>
                setInputValues((o) => ({ ...o, min: +e.target.value }))
              }
            />{' '}
            to{' '}
            <input
              type="number"
              className="input-inline"
              step="any"
              min={inputValues.min}
              max={absMax}
              value={inputValues.max}
              onChange={(e) =>
                setInputValues((o) => ({ ...o, max: +e.target.value }))
              }
            />
          </span>
          <button
            className="btn btn-outline-dark btn-sm"
            disabled={
              inputValues.min === currentMin && inputValues.max === currentMax
            }
            type="submit"
          >
            <BsSortAlphaDown /> Update filters
          </button>
        </form>
      )}
    </div>
  );
};

const FilterWrapper: FC<{
  title: string;
  subtitle?: string;
  clearFilter?: () => void;
  isColorField?: boolean;
  isSizeField?: boolean;
  children?: React.ReactNode;
}> = ({
  title,
  subtitle,
  clearFilter,
  children,
  isColorField,
  isSizeField,
}) => {
  const [expanded, setExpanded] = useState(!!isColorField || !!clearFilter);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: '1 auto',
          }}
        >
          {isColorField && <BsPaletteFill style={{ marginRight: '0.5rem' }} />}
          {isSizeField && <MdBubbleChart style={{ marginRight: '0.5rem' }} />}
          <div className={subtitle ? 'line-height-1' : undefined}>
            {title} {subtitle && <div className="text-muted">{subtitle}</div>}
          </div>
        </div>

        <button
          style={{ marginRight: '0.5rem' }}
          disabled={!clearFilter}
          onClick={clearFilter}
        >
          <RiFilterOffFill /> Clear filter
        </button>
        <button onClick={() => setExpanded((v) => !v)}>
          {expanded ? <BsChevronUp /> : <BsChevronDown />}
        </button>
      </h4>

      <AnimateHeight height={expanded ? 'auto' : 0} duration={400}>
        {children}
      </AnimateHeight>
    </div>
  );
};

export const Filters: FC = () => {
  const { navState, data, computedData, setNavState } =
    useContext(GraphContext);
  const editable = navState.role !== 'v';

  const setFilters = useCallback(
    (filters: Filter[] | null) =>
      setNavState({ ...navState, filters: filters || undefined }),
    [navState, setNavState]
  );

  const { getColor } = computedData;
  const { filters, nodeColorField, nodeSizeField } = navState;
  const filtersIndex = keyBy(filters || [], 'field');
  const allFilterable = getFilterableFields(data, navState);

  const cleanAndSetFilters = (field: string, filter: Filter | null) => {
    const newFilters = filter
      ? (filters || []).filter((f) => f.field !== field).concat(filter)
      : (filters || []).filter((f) => f.field !== field);

    setFilters(newFilters.length ? newFilters : null);
  };

  if (!allFilterable.length) return null;

  return (
    <div className="graph-filters-block block">
      {allFilterable.map((field) => {
        const metric = computedData.metrics[field.id];

        if (!metric || !field) return null;

        switch (field.type) {
          case 'quanti':
            return (
              <FilterWrapper
                key={field.id}
                title={field.label}
                subtitle={field.typeLabel}
                clearFilter={
                  editable && filtersIndex[field.id]
                    ? () => cleanAndSetFilters(field.id, null)
                    : undefined
                }
                isColorField={field.id === nodeColorField}
                isSizeField={field.id === nodeSizeField}
              >
                <RangeFilterComponent
                  field={field}
                  data={metric as RangeMetric}
                  filter={filtersIndex[field.id] as RangeFilter | undefined}
                  setFilter={(filter) => cleanAndSetFilters(field.id, filter)}
                  getColor={field.id === nodeColorField ? getColor : null}
                  editable={editable}
                />
              </FilterWrapper>
            );
          case 'quali':
            return (
              <FilterWrapper
                key={field.id}
                title={field.label}
                subtitle={field.typeLabel}
                clearFilter={
                  editable && filtersIndex[field.id]
                    ? () => cleanAndSetFilters(field.id, null)
                    : undefined
                }
                isColorField={field.id === nodeColorField}
                isSizeField={field.id === nodeSizeField}
              >
                <TermsFilterComponent
                  field={field}
                  data={metric as TermsMetric}
                  filter={filtersIndex[field.id] as TermsFilter | undefined}
                  setFilter={(filter) => cleanAndSetFilters(field.id, filter)}
                  getColor={field.id === nodeColorField ? getColor : null}
                  editable={editable}
                />
              </FilterWrapper>
            );
          case 'content':
          default:
            return editable ? (
              <FilterWrapper
                key={field.id}
                title={field.label}
                subtitle={field.typeLabel}
                clearFilter={
                  editable && filtersIndex[field.id]
                    ? () => cleanAndSetFilters(field.id, null)
                    : undefined
                }
                isColorField={field.id === nodeColorField}
                isSizeField={field.id === nodeSizeField}
              >
                <SearchFilterComponent
                  field={field}
                  data={metric as SearchMetrics}
                  filter={filtersIndex[field.id] as SearchFilter | undefined}
                  setFilter={(filter) => cleanAndSetFilters(field.id, filter)}
                />
              </FilterWrapper>
            ) : null;
        }
      })}
    </div>
  );
};
