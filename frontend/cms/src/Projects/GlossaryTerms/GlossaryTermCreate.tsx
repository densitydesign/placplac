import { Create, CreateProps } from "react-admin";
import { useLocation, useHistory } from "react-router";
import { GlossaryTermForm } from "./GlossaryTermForm";

export const GlossaryTermCreate = (props: CreateProps) => {
  const location = useLocation();
  const history = useHistory();
  const project = new URLSearchParams(location.search).get("project");
  if (!project) history.goBack();

  return (
    <Create {...props}>
      <GlossaryTermForm initialValues={{ project }} />
    </Create>
  );
};