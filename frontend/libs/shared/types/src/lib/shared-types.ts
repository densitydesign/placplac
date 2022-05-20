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
  id: string | number;
  title: string;
  color: string;
  glossary_category: string;
  category_title: string;
  more_info_url: { title: string; url: string }[];
  image: string | null;
  description: string;
  used_in: { id: number | string; title: string }[];
  related: Partial<GlossaryTerm>[];
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
  in_text_citation: string;
};

export type LanguageOptions = 'it' | 'en';

export type Project = {
  id: string | number;
  title: string;
  short_description: string;
  experiments_description: string;
  long_description: string;
  experiments: Experiment[];
  glossary_terms: GlossaryTerm[];
  language: LanguageOptions;
  references: Reference[];
  project_explanation?: string;
  in_project_references: Reference[];
  glossary_categories:GlossaryCategory[]
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
  pdf_report?: string;
  additional_material?: { id: string; file: string; name: string }[];
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
