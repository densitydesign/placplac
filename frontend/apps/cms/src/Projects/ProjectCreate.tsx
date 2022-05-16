import { Create, CreateProps } from 'react-admin';

import { ProjectForm } from './ProjectForm';

export const ProjectCreate = () => {
  return (
    <Create>
      <ProjectForm />
    </Create>
  );
};
