import { ReactElement } from 'react';

export type RowType = { divided: boolean; cols: any[] };

export type Step = {
  title: string;
  description: string;
  step_number: number;
  content: RowType[];
  glossary_terms: GlossaryTerm[];
  downloads: { id: string; file: string; title: string; name: string }[];
};
export type GlossaryTerm = {
  id: string;
  title: string;
  color: string;
  glossary_category: string;
  category_title: string;
  more_info_url: string;
  image: string | null;
  description: string;
};
export type GlossaryCategory = {
  id: number;
  title: string;
  description: string;
  color: string;
};
export type Reference = {
  id: number;
  description: string;
};

export type LanguageOptions = 'it' | 'en';

export type Project = {
  title: string;
  short_description: string;
  experiments_description: string;
  long_description: string;
  experiments: Experiment[];
  glossary_terms: GlossaryTerm[];
  language: LanguageOptions;
  references: Reference[];
};
export type Experiment = {
  id: number;
  cover: string;
  title: string;
  description: string;
  context?: RowType[];
  research_question?: string;
  experiment_setup?: RowType[];
  findings?: RowType[];
  steps: Step[];
  tags: string[];
  glossary_terms: GlossaryTerm[];
  references: Reference[];
};

export type Footer = {
  partners?: { link: string; image: string }[];
  founded_by?: { link: string; image: string }[];
  socials?: { facebook?: string; twitter?: string; mail?: string };
};

export type PossibleColumns = Array<1 | 2 | 3 | 4>;

export type BuilderShowBlock = {
  description: string;
  render: (content: any) => React.ReactElement;
};
export type BuilderBlock = {
  form: {
    component: ReactElement<any>;
    getInitialContent?: (content: any) => any;
    getSaveContent?: (content: any) => any;
  };
} & BuilderShowBlock;

export type BuilderShowBlocks = { [k: string]: BuilderShowBlock };
export type BuilderBlocks = { [k: string]: BuilderBlock };
export type Row = { divided: boolean; cols: any[] };
