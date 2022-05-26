import { Identifier } from 'react-admin';

export enum ProjectUserLevel {
  AUTHOR = '1',
  COLLABORATOR = '2',
  VIEWER = '3',
}

export enum ProjectStatus {
  PUBLISHED = '1',
  DRAFT = '2',
}

export enum ProjectLanguage {
  EN = 'en',
  IT = 'it',
}

interface ProjectFooter {
  partners: { link: string; image: string }[];
  socials: { facebook?: string; twitter?: string; mail?: string };
}
export interface Project {
  id: Identifier;
  title: string;
  short_description?: string;
  experiments_description?: string;
  long_description?: string;
  status: ProjectStatus;
  created_date: Date;
  last_update: Date;
  experiment_set: Identifier[];
  glossaryterm_set: Identifier[];
  projectuser_set: Identifier[];
  projectmedia_set: Identifier[];
  language: ProjectLanguage;
  user_level: ProjectUserLevel;
  reference_set: Identifier[];
  footer?: ProjectFooter;
  glossary_description?: string;
  last_build?: string;
  last_build_time?: Date;
  cover_images: string[];
}

export interface Experiment {
  id: Identifier;
  title: string;

  tags: string[];
  description?: string;
  order: number;
  context?: string;
  research_question?: string;
  experiment_setup?: string;
  findings?: string;
  project: Identifier;
  step_set: Identifier[];
  cover?: string;
  pdf_report?: string;
  experimentadditionalmaterial_set: Identifier[];
}

export interface Step {
  id: Identifier;
  title: string;
  description?: string;
  content?: string;
  step_number: number;
  experiment: Identifier;
  project: Identifier;
  stepdownload_set: Identifier[];
}
