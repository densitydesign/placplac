import { Breadcrumbs, Typography } from "@material-ui/core";
import { Edit, EditProps, Record, Link } from "react-admin";
import { TopToolbarWithTitle } from "../components/TopToolbarWithTitle";
import { DownloadButton } from "./DownloadButton";
import { PreviewButton } from "./PreviewButton";

import { ProjectForm } from "./ProjectForm";

const PostEditActions = ({ data }: { data?: Record }) => {
  return (
    <TopToolbarWithTitle
      title={
        <>
          <Typography variant="h5">Project</Typography>
          {data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<Typography variant="h6">{`>`}</Typography>}
            >
              <Link to={`/projects/${data.id}`}>
                <Typography variant="subtitle1">{data.title}</Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    >
      {data && <PreviewButton project={data.id} />}
      {data && data.status === "1" && (
        <>
          <DownloadButton project={data} />
        </>
      )}
    </TopToolbarWithTitle>
  );
};

export const ProjectEdit = (props: EditProps) => {
  return (
    <Edit
      title="idinjadjiajnd"
      mutationMode="pessimistic"
      {...props}
      actions={<PostEditActions />}
    >
      <ProjectForm />
    </Edit>
  );
};
