import { Card, Typography, Box } from '@mui/material';
import React, { ReactNode } from 'react';
interface ListCardProps {
  children: ReactNode;
  title: ReactNode;
}
export const ListCard = ({ children, title }: ListCardProps) => {
  return (
    <>
      <Box mb={2}>{title}</Box>
      <Card sx={{ overflow: 'inherit' }}>{children}</Card>
    </>
  );
};
