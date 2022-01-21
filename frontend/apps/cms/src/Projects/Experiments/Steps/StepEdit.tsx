import { CreateProps, Edit } from "react-admin";
import { StepActions } from "./StepActions";
import { StepForm } from "./StepForm";

export const StepEdit = (props: CreateProps) => {
  return (
    <Edit {...props} actions={<StepActions />}>
      <StepForm />
    </Edit>
  );
};
