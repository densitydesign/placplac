import { Edit, EditProps, TopToolbar, Record } from "react-admin";
import { DownloadButton } from "./DownloadButton";
import { PreviewButton } from "./PreviewButton";

import { ProjectForm } from "./ProjectForm";

const PostEditActions = ({ data }: { data?: Record }) => (
  <TopToolbar>
    {data && <PreviewButton project={data.id} />}
    {data && data.status === "1" && (
      <>
        <DownloadButton project={data} />
      </>
    )}
  </TopToolbar>
);

export const ProjectEdit = (props: EditProps) => {
  return (
    <Edit mutationMode="pessimistic" {...props} actions={<PostEditActions />}>
      <ProjectForm />
    </Edit>
  );
};
