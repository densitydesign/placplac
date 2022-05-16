import { Edit, EditProps } from 'react-admin';
import { ReferenceActions } from './ReferenceActions';

import { ReferenceForm } from './ReferenceForm';

export const ReferenceEdit = () => {
  return (
    <Edit actions={<ReferenceActions />}>
      <ReferenceForm />
    </Edit>
  );
};
