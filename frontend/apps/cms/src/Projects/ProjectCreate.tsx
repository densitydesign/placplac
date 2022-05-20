import { Create, SimpleForm } from 'react-admin';
import { ProjectSummaryInputs } from './components/ProjectSummaryInputs';

export const ProjectCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ProjectSummaryInputs />
      </SimpleForm>
    </Create>
  );
};
