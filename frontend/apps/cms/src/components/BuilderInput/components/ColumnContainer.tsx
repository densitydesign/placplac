import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
const PREFIX = 'ColumnContainer';

const classes = {
  container: `${PREFIX}-container`,
  button: `${PREFIX}-button`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.container}`]: {
    '&:hover': {
      '& .bgBox': { backgroundColor: 'black', opacity: 0.7 },
      '& button': {
        display: 'flex',
      },
    },
  },

  [`& .${classes.button}`]: { display: 'none', color: 'white' },
}));

interface ColumnContainerProps {
  children: React.ReactNode;
  onClick: () => void;
  moveCellLeft: (rowIndex: number, cellIndex: number) => void;
  moveCellRight: (rowIndex: number, cellIndex: number) => void;
  deleteCell: (rowIndex: number, cellIndex: number) => void;
  rowIndex: number;
  colIndex: number;
}

export const ColumnContainer = (props: ColumnContainerProps) => {
  const {
    children,
    onClick,
    moveCellLeft,
    moveCellRight,
    deleteCell,
    rowIndex,
    colIndex,
  } = props;
  return (
    <StyledBox position={'relative'}>
      <Box
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        display={'flex'}
        className={classes.container}
        zIndex={'10'}
      >
        <Box
          className="bgBox"
          position="absolute"
          width="100%"
          height="100%"
        ></Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'middle'}
          mt="auto"
          mb="auto"
          width={'100%'}
        >
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();
              moveCellLeft(rowIndex, colIndex);
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>

          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();

              deleteCell(rowIndex, colIndex);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();

              onClick();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();

              moveCellRight(rowIndex, colIndex);
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>

      <div className="inner-column">{children}</div>
    </StyledBox>
  );
};
