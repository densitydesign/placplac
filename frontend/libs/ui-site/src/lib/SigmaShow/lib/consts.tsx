import RAW_PALETTES from 'iwanthue/precomputed/k-means-fancy-light';
import { Props as LinkifyProps } from 'react-linkify';
import React from 'react';
import { Attributes } from 'graphology-types';

export const SAMPLE_DATASET_URI = process.env.PUBLIC_URL + '/dataset.gexf';

// Palettes:
export const PALETTES = RAW_PALETTES as Record<number, string[]>;
export const MAX_PALETTE_SIZE = Math.max(
  ...Object.keys(PALETTES).map((s) => +s)
);
export const GRADIENT = ['#99f3cb', '#222123'];

// Graph rendering:
export const NODE_DEFAULT_SIZE = 5;
export const NODE_SIZE_MIN = 10;
export const NODE_SIZE_MAX = 50;

export const EDGE_DEFAULT_SIZE = 3;
export const EDGE_SIZE_MIN = 1;
export const EDGE_SIZE_MAX = 5;
export const HIGHLIGHTED_EDGE_SIZE_RATIO = 2;

export const DEFAULT_NODE_COLOR = '#aaa';
export const DEFAULT_EDGE_COLOR = '#ccc';
export const HIDDEN_NODE_COLOR = '#f0f0f0';
export const HIGHLIGHTED_NODE_COLOR = '#333333';
export const HIDDEN_EDGE_COLOR = '#f6f6f6';

export const MIN_NODE_SIZE_RATIO = 0.1;
export const MAX_NODE_SIZE_RATIO = 10;
export const DEFAULT_NODE_SIZE_RATIO = 1;
export const NODE_SIZE_RATIO_STEP = 0.001;

export const MIN_EDGE_SIZE_RATIO = 0.1;
export const MAX_EDGE_SIZE_RATIO = 10;
export const DEFAULT_EDGE_SIZE_RATIO = 1;
export const EDGE_SIZE_RATIO_STEP = 0.001;

export const MIN_LABEL_SIZE = 5;
export const MAX_LABEL_SIZE = 50;
export const DEFAULT_LABEL_SIZE = 14;
export const LABEL_SIZE_STEP = 1;

export const MIN_LABEL_THRESHOLD = 0.1;
export const MAX_LABEL_THRESHOLD = 10;
export const DEFAULT_LABEL_THRESHOLD = 1;
export const LABEL_THRESHOLD_STEP = 0.001;

export const ANIMATION_DURATION = 400;
export const MAX_OPTIONS = 50;

// Data indexation:
export const RESERVED_FIELDS = new Set([
  'label',
  'size',
  'color',
  'x',
  'y',
  'z',
]);

export const RETINA_FIELD_PREFIX = 'RETINA::';
export const RETINA_HIDDEN_FIELD_PREFIX = RETINA_FIELD_PREFIX + 'HIDDEN::';
export const RETINA_NUMBER_FIELD_PREFIX = RETINA_FIELD_PREFIX + 'NUMBER::';
export const RETINA_STRING_FIELD_PREFIX = RETINA_FIELD_PREFIX + 'STRING::';

export function isHiddenRetinaField(str: string): boolean {
  return str.indexOf(RETINA_HIDDEN_FIELD_PREFIX) === 0;
}

export function removeRetinaPrefix(str: string): string {
  return str
    .replace(RETINA_NUMBER_FIELD_PREFIX, '')
    .replace(RETINA_STRING_FIELD_PREFIX, '');
}

export function hiddenReducer(key: string, data: Attributes) {
  return { ...data, hidden: true };
}

// Vendor component styles:
export const SLIDER_STYLE = {
  dotStyle: { borderColor: '#ccc' },
  railStyle: { backgroundColor: '#ccc' },
  activeDotStyle: { borderColor: 'black' },
  trackStyle: { backgroundColor: 'black' },
  handleStyle: { backgroundColor: 'white', borderColor: 'black' },
};
export const RANGE_STYLE = {
  dotStyle: { borderColor: '#ccc' },
  railStyle: { backgroundColor: '#ccc' },
  activeDotStyle: { borderColor: 'black' },
  trackStyle: [{ backgroundColor: 'black' }, { backgroundColor: 'black' }],
  handleStyle: [
    { backgroundColor: 'white', borderColor: 'black' },
    { backgroundColor: 'white', borderColor: 'black' },
  ],
};
export const DEFAULT_SELECT_PROPS = {
  classNamePrefix: 'react-select',
};
export const DEFAULT_LINKIFY_PROPS: Partial<LinkifyProps> = {
  textDecorator: (str) => str.replace(/^https?:\/\//, ''),
  componentDecorator: (
    decoratedHref: string,
    decoratedText: string,
    key: number
  ) => (
    <a key={key} href={decoratedHref} target="_blank" rel="noreferrer">
      {decoratedText}
    </a>
  ),
};
