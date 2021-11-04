import { Edit, EditProps } from "react-admin";
import { ExperimentActions } from "./ExperimentActions";

import { ExperimentForm } from "./ExperimentForm";

export const ExperimentEdit = (props: EditProps) => {
  return (
    <Edit {...props} actions={<ExperimentActions />}>
      <ExperimentForm />
    </Edit>
  );
};
