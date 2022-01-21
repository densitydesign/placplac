import { Link } from "ra-ui-materialui";
import React from "react";
import { useRecordContext } from "ra-core";
import { Typography, Breadcrumbs } from "@material-ui/core";
import { TopToolbarWithTitle } from "../../../components/TopToolbarWithTitle";
import { useGetOne } from "react-admin";

interface StepActionsProps {
  experiment?: number | string;
}
export const StepActions = (props: StepActionsProps) => {
  const record = useRecordContext();
  const { data: dataExp } = useGetOne("experiments", record?.experiment, {
    enabled: !!record,
  });
  const { data } = useGetOne("projects", dataExp?.project, {
    enabled: !!dataExp,
  });
  return (
    <TopToolbarWithTitle
      title={
        <>
          <Typography variant="h3">Step</Typography>
          {record && data && dataExp && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<Typography variant="h4">{`>`}</Typography>}
            >
              <Link to={`/projects/${data.id}`}>
                <Typography variant="h4">{data.title}</Typography>
              </Link>
              <Link to={`/experiments/${dataExp.id}/3`}>
                <Typography variant="h4">{dataExp.title}</Typography>
              </Link>
              <Link to={`/steps/${record.id}`}>
                <Typography variant="h4">{record.title}</Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
