import { Edit, EditProps } from "react-admin";
import { ReferenceActions } from "./ReferenceActions";

import { ReferenceForm } from "./ReferenceForm";

export const ReferenceEdit = (props: EditProps) => {
  return (
    <Edit {...props} actions={<ReferenceActions />}>
      <ReferenceForm />
    </Edit>
  );
};
