import { Edit, EditProps } from "react-admin";

import { GlossaryTermForm } from "./GlossaryTermForm";

export const GlossaryTermEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <GlossaryTermForm />
    </Edit>
  );
};
