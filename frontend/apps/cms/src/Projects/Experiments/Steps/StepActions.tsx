import { Link } from 'react-admin';
import React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography, Breadcrumbs } from '@mui/material';
import { TopToolbarWithTitle } from '../../../components/TopToolbarWithTitle';
import { useGetOne } from 'react-admin';
import { PreviewButton } from '../../components/PreviewButton';

interface StepActionsProps {
  experiment?: number | string;
}
export const StepActions = (props: StepActionsProps) => {
  const record = useRecordContext();
  const { data: dataExp } = useGetOne(
    'experiments',
    { id: record?.experiment },
    {
      enabled: !!record,
    }
  );
  const { data } = useGetOne(
    'projects',
    { id: dataExp?.project },
    {
      enabled: !!dataExp,
    }
  );
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
    >
      {data && <PreviewButton project={data.id} />}
    </TopToolbarWithTitle>
  );
};
