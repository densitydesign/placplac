import { Edit, EditProps } from 'react-admin';
import { GlossaryCategoryActions } from './GlossaryCategoryActions';

import { GlossaryCategoryForm } from './GlossaryCategoryForm';

export const GlossaryCategoryEdit = (props: EditProps) => {
  return (
    <Edit {...props} actions={<GlossaryCategoryActions />}>
      <GlossaryCategoryForm />
    </Edit>
  );
};
