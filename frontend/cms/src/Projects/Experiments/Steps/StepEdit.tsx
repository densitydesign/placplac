import { CreateProps, Edit } from "react-admin";
import { useLocation, useHistory } from "react-router";
import { StepForm } from "./StepForm";

export const StepEdit = (props: CreateProps) => {
  const location = useLocation();
  const history = useHistory();
  const q = new URLSearchParams(location.search);
  const project = q.get("project");
  const experiment = q.get("experiment");
  if (!project || !experiment) history.goBack();
  const redirect = project ? `/experiments/${experiment}/5` : false;

  return (
    <Edit {...props}>
      <StepForm redirect={redirect} project={parseInt(project!)} />
    </Edit>
  );
};
