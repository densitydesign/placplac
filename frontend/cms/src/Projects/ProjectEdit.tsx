import { Edit, EditProps } from "react-admin";

import { ProjectForm } from "./ProjectForm";

export const ProjectEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <ProjectForm />
    </Edit>
  );
};
