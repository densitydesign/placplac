import { Create, CreateProps } from "react-admin";
import { ExperimentForm } from "./ExperimentForm";
import { useLocation, useHistory } from "react-router";
import { ExperimentActions } from "./ExperimentActions";
export const ExperimentCreate = (props: CreateProps) => {
  const location = useLocation();
  const history = useHistory();
  const project = new URLSearchParams(location.search).get("project");
  if (!project) history.goBack();

  return (
    <Create {...props} actions={<ExperimentActions project={project!} />}>
      <ExperimentForm initialValues={{ project }} />
    </Create>
  );
};
