import { Link } from 'ra-ui-materialui';
import React from 'react';
import { useRecordContext } from 'ra-core';
import { Typography, Breadcrumbs } from '@material-ui/core';
import { TopToolbarWithTitle } from '../../../components/TopToolbarWithTitle';
import { useGetOne } from 'react-admin';

interface StepActionsProps {
  experiment?: number | string;
}
export const StepActions = (props: StepActionsProps) => {
  const record = useRecordContext();
  const { data: dataExp } = useGetOne('experiments', record?.experiment, {
    enabled: !!record,
  });
  const { data } = useGetOne('projects', dataExp?.project, {
    enabled: !!dataExp,
  });
  return (
    <TopToolbarWithTitle
      title={
        <>
          <span className="breadcumb">{'Step >'}</span>
          {record && data && dataExp && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<span className="breadcumb-item">{`>`}</span>}
            >
              <Link to={`/projects/${data.id}`}>
                <span className="breadcumb-item">{data.title}</span>
              </Link>
              <Link to={`/experiments/${dataExp.id}/3`}>
                <span className="breadcumb-item">{dataExp.title}</span>
              </Link>
              <Link to={`/steps/${record.id}`}>
                <span className="breadcumb-item">{record.title}</span>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
