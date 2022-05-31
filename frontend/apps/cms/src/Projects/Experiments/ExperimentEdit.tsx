import { Edit, EditProps } from 'react-admin';
import { ExperimentActions } from './ExperimentActions';

import { ExperimentForm } from './ExperimentForm';

export const ExperimentEdit = () => {
  return (
    <Edit redirect="edit" actions={<ExperimentActions />}>
      <ExperimentForm />
    </Edit>
  );
};
