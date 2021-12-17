import { Grid, Box, IconButton, Button } from "@material-ui/core";
import { TextShow, ExperimentSetupListShow, IFrame } from "frontend-components";
import React, { Fragment } from "react";
import { ImageShowBackend } from "../../showComponentsBackend/ImageShowBackend";
import { ColumnContainer } from "./ColumnContainer";
import { EmptyColumn } from "./EmptyColumn";
import AddIcon from "@material-ui/icons/Add";
import { BuilderBlock } from "../types";
import Delete from "@material-ui/icons/Delete";
import { Row as RowGrid } from "frontend-components";
import KeyboardArrowTopIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowBottomIcon from "@material-ui/icons/KeyboardArrowDown";

interface RowProps {
  row: any[];
  rowIndex: number;
  deleteRow: (rowIndex: number) => void;
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
  } = props;

  return (
    <RowGrid
      style={{ border: "1px solid black", position: "relative" }}
      className={"main-application"}
      key={rowIndex}
    >
      {row.map((col, colIndex) => (
        <Fragment key={colIndex}>
          {Object.keys(col).length === 0 ? (
            <EmptyColumn>
              <Grid container justify="center" alignItems="center">
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={() => setActiveItem({ rowIndex, colIndex })}
                >
                  <AddIcon />
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
              {col.type === "text" && <TextShow text={col.content.text} />}
              {col.type === "listExperimentSetup" && (
                <ExperimentSetupListShow
                  title={col.content.title}
                  subtitle={col.content.subtitle}
                  list={col.content.list}
                />
              )}
              {col.type === "image" && (
                <ImageShowBackend
                  description={col.content.description}
                  image={col.content.image}
                  caption={col.content.caption}
                  title={col.content.title}
                  subtitle={col.content.subtitle}
                  isWide={col.content.isWide}
                />
              )}
              {col.type === "iframe" && (
                <IFrame
                  src={col.content.src}
                  width={col.content.width}
                  height={col.content.height}
                />
              )}
            </ColumnContainer>
          )}
        </Fragment>
      ))}
      <Box
        position="absolute"
        right={2}
        top={2}
        display={"flex"}
        gridGap={"5px"}
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
      </Box>
    </RowGrid>
  );
};
