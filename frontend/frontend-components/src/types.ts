export type Step = {
  title: string;
  description: string;
  step_number: number;
  content: any;
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

export type LanguageOptions = "it" | "en";

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
  context?: any[];
  research_question?: string;
  experiment_setup?: any[];
  findings?: any[];
  steps: Step[];
  tags: string[];
  glossary_terms: GlossaryTerm[];
  references: Reference[];
};
