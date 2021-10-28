import { Edit, EditProps } from "react-admin";

import { ExperimentForm } from "./ExperimentForm";

export const ExperimentEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <ExperimentForm />
    </Edit>
  );
};
