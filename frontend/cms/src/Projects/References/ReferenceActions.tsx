import { Link } from "ra-ui-materialui";
import { useRecordContext } from "ra-core";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { useGetOne } from "react-admin";
import { TopToolbarWithTitle } from "../../components/TopToolbarWithTitle";

interface ReferenceActionsProps {
  project?: number | string;
}
export const ReferenceActions = (props: ReferenceActionsProps) => {
  const record = useRecordContext();
  const { data } = useGetOne("projects", record?.project, {
    enabled: !!record,
  });
  return (
    <TopToolbarWithTitle
      title={
        <>
          <Typography variant="h5">References</Typography>
          {record && data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<Typography variant="h6">{`>`}</Typography>}
            >
              <Link to={`/projects/${data.id}/3`}>
                <Typography variant="subtitle1">{data.title}</Typography>
              </Link>
              <Link to={`/references/${record.id}`}>
                <Typography variant="subtitle1">{record.title}</Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
