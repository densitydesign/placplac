import { Create, CreateProps } from "react-admin";

import { ProjectForm } from "./ProjectForm";

export const ProjectCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <ProjectForm />
    </Create>
  );
};
