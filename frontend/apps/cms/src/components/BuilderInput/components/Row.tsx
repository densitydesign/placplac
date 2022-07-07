import {
  Grid,
  Box,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { Fragment } from 'react';
import { ColumnContainer } from './ColumnContainer';
import { EmptyColumn } from './EmptyColumn';
import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { Row as RowGrid } from '@algocount/ui-site';
import KeyboardArrowTopIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowBottomIcon from '@mui/icons-material/KeyboardArrowDown';
import { RowType, BuilderBlock, BuilderBlocks } from '@algocount/shared/types';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AddBoxIcon from '@mui/icons-material/AddBox';
interface RowProps {
  row: RowType;
  rowIndex: number;
  deleteRow: (rowIndex: number) => void;
  switchDivided: (rowIndex: number) => void;
  setActiveItem: React.Dispatch<
    React.SetStateAction<
      | {
          rowIndex: number;
          colIndex: number;
        }
      | undefined
    >
  >;
  onColumnClick: (
    type: BuilderBlock,
    rowIndex: number,
    colIndex: number
  ) => void;
  deleteCell: (rowIndex: number, cellIndex: number) => void;

  moveCellLeft: (rowIndex: number, cellIndex: number) => void;
  moveCellRight: (rowIndex: number, cellIndex: number) => void;
  moveRowUp: (rowIndex: number) => void;
  moveRowDown: (rowIndex: number) => void;
  builderBlocks: BuilderBlocks;
  canDivided: boolean;
  addCell: (rowIndex: number) => void;
}

export const Row = (props: RowProps) => {
  const {
    row,
    rowIndex,
    deleteRow,
    setActiveItem,
    onColumnClick,
    moveCellLeft,
    moveCellRight,
    moveRowDown,
    moveRowUp,
    deleteCell,
    addCell,
    switchDivided,
    builderBlocks,
    canDivided,
  } = props;

  return (
    <RowGrid
      style={{
        position: 'relative',
        ...(canDivided ? { borderBottom: '1px solid black' } : {}),
      }}
      className={'main-application'}
      divided={canDivided && row.divided}
      key={rowIndex}
    >
      {row.cols.map((col, colIndex) => (
        <Fragment key={colIndex}>
          {Object.keys(col).length === 0 ? (
            <EmptyColumn>
              <Grid container justifyContent="center" alignItems="center">
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={() => setActiveItem({ rowIndex, colIndex })}
                >
                  <AddBoxIcon />
                </IconButton>
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteCell(rowIndex, colIndex);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </EmptyColumn>
          ) : (
            <ColumnContainer
              deleteCell={deleteCell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              moveCellLeft={moveCellLeft}
              moveCellRight={moveCellRight}
              onClick={() => {
                onColumnClick(col.type, rowIndex, colIndex);
              }}
            >
              {col?.type in builderBlocks &&
                builderBlocks[col.type].render(col.content)}
            </ColumnContainer>
          )}
        </Fragment>
      ))}
      <Box
        style={{
          transform: 'translateY(-50%)',
          right: '-16px',
          position: 'absolute',
          top: ' 50%',
          zIndex: '10',
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          disabled={row.cols.length >= 4}
          onClick={() => addCell(rowIndex)}
          title="Add column"
          style={{ height: '64px', borderRadius: '100%' }}
        >
          <AddRoadIcon />
        </Button>
      </Box>
      <Box
        component={'span'}
        position="absolute"
        right={2}
        top={2}
        display={'flex'}
        gap={'5px'}
        zIndex={'100'}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            moveRowUp(rowIndex);
          }}
        >
          <KeyboardArrowTopIcon />
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            deleteRow(rowIndex);
          }}
        >
          <Delete />
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            moveRowDown(rowIndex);
          }}
        >
          <KeyboardArrowBottomIcon />
        </Button>

        {canDivided && (
          <FormControlLabel
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: ' 5px 5px 5px 0px',
              marginLeft: '5px',
            }}
            label={'Divided'}
            control={
              <Switch
                color="primary"
                onChange={() => switchDivided(rowIndex)}
                checked={row.divided}
              />
            }
          />
        )}
      </Box>
    </RowGrid>
  );
};
