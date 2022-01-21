import { Edit, EditProps } from "react-admin";
import { GlossaryTermActions } from "./GlossaryTermActions";

import { GlossaryTermForm } from "./GlossaryTermForm";

export const GlossaryTermEdit = (props: EditProps) => {
  return (
    <Edit {...props} actions={<GlossaryTermActions />}>
      <GlossaryTermForm />
    </Edit>
  );
};
