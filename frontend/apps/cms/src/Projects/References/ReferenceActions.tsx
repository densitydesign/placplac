import { Link } from "ra-ui-materialui";
import { useRecordContext } from "ra-core";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { RichTextField, useGetOne } from "react-admin";
import { TopToolbarWithTitle } from "../../components/TopToolbarWithTitle";

export const ReferenceActions = () => {
  const record = useRecordContext();

  const { data: experiment } = useGetOne("experiments", record?.experiment, {
    enabled: !!record?.experiment,
  });
  const { data: project } = useGetOne(
    "projects",
    !!record?.project ? record.project : experiment?.project,
    {
      enabled: !!record?.project || !!experiment?.project,
    }
  );
  return (
    <TopToolbarWithTitle
      title={
        <>
          <Typography variant="h5">References</Typography>
          {record && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<Typography variant="h6">{`>`}</Typography>}
            >
              {project && (
                <Link to={`/projects/${project.id}/3`}>
                  <Typography variant="subtitle1">{project.title}</Typography>
                </Link>
              )}
              {experiment && (
                <Link to={`/experiments/${experiment.id}/5`}>
                  <Typography variant="subtitle1">
                    {experiment.title}
                  </Typography>
                </Link>
              )}
              <Link to={`/references/${record.id}`}>
                <Typography variant="subtitle1">
                  <RichTextField
                    variant="inherit"
                    stripTags
                    source="id"
                    record={{
                      id: record.description.substring(0, 20).trimEnd() + "...",
                    }}
                  />
                </Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
