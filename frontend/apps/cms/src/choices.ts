import { ProjectLanguage, ProjectStatus, ProjectUserLevel } from './types';

export const USER_LEVEL_CHOICES = [
  { name: 'Author', id: ProjectUserLevel.AUTHOR },
  { name: 'Collaborator', id: ProjectUserLevel.COLLABORATOR },
  { name: 'Viewer', id: ProjectUserLevel.VIEWER },
];
export const LANGUAGE_CHOICES = [
  { name: 'English', id: ProjectLanguage.EN },
  { name: 'Italian', id: ProjectLanguage.IT },
];
export const STATUS_CHOICES = [
  { name: 'Draft', id: ProjectStatus.DRAFT },
  { name: 'Published', id: ProjectStatus.PUBLISHED },
];
