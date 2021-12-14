import { Grid, Box, IconButton, GridSize, Button } from "@material-ui/core";
import { TextShow, ExperimentSetupListShow } from "frontend-components";
import React from "react";
import { ImageShowBackend } from "../../showComponentsBackend/ImageShowBackend";
import { ColumnContainer } from "./ColumnContainer";
import { EmptyColumn } from "./EmptyColumn";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { BuilderBlock } from "../types";

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
    deleteCell
  } = props;
  const nCols = row.length;
  const size = (12 / nCols) as GridSize;
  return (
    <Grid
      style={{ border: "1px solid black" }}
      className={"main-application"}
      key={rowIndex}
      container
    >
      <Box width="100%" position="relative">
        <Box position="absolute" right={2} top={2}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              deleteRow(rowIndex);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {row.map((col, colIndex) => (
        <Grid key={colIndex} item xs={size} container>
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
        </Grid>
      ))}
    </Grid>
  );
};
