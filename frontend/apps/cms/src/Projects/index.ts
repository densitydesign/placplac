import { ProjectCreate } from './ProjectCreate';
import { ProjectEdit } from './ProjectEdit';
import { ProjectList } from './ProjectList';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

export const ProjectResource = {
  list: ProjectList,
  edit: ProjectEdit,
  create: ProjectCreate,
  name: 'projects',
  icon:CollectionsBookmarkIcon
};
