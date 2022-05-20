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
}
