import { Grid, Box, IconButton, Button } from "@material-ui/core";
import { TextShow, ExperimentSetupListShow } from "frontend-components";
import React, { Fragment } from "react";
import { ImageShowBackend } from "../../showComponentsBackend/ImageShowBackend";
import { ColumnContainer } from "./ColumnContainer";
import { EmptyColumn } from "./EmptyColumn";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { BuilderBlock } from "../types";
import Delete from "@material-ui/icons/Delete";
import { Row as RowGrid } from "frontend-components";

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
  moveCellUp: (rowIndex: number, cellIndex: number) => void;
  moveCellDown: (rowIndex: number, cellIndex: number) => void;
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
    moveCellDown,
    moveCellUp,
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
              moveCellDown={moveCellDown}
              moveCellUp={moveCellUp}
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
            </ColumnContainer>
          )}
        </Fragment>
      ))}
      <Box position="absolute" right={2} top={2}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            deleteRow(rowIndex);
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </RowGrid>
  );
};
