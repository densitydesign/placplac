import { Box, makeStyles } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import React from 'react';
import { TopToolbar } from 'react-admin';
const PREFIX = 'TopToolbarWithTitle';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledTopToolbar = styled(TopToolbar)(({ theme }) => ({
  [`&.${classes.root}`]: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}));

export const TopToolbarWithTitle = (props: {
  children?: React.ReactNode;
  className?: string;
  title: React.ReactNode;
}) => {
  return (
    <StyledTopToolbar className={classNames(classes.root, props.className)}>
      <Box display="flex" flexDirection="column">
        {props.title}
      </Box>
      <div>{props.children}</div>
    </StyledTopToolbar>
  );
};
