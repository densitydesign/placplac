import { Typography } from '@mui/material';
import { ListCard } from '../../../components/ListCard';
import React from 'react';

export const ProjectListCard: React.FC = (props) => {
  return (
    <ListCard title={<Typography variant="h3">Projects</Typography>}>
      {props.children}
    </ListCard>
  );
};
