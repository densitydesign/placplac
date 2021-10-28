import { Box, Grid, GridSize, IconButton } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useDialoglUpdate } from "../../useDialogUpdate";
import DeleteIcon from "@material-ui/icons/Delete";
import { useInput } from "react-admin";
import { BuilderDialog } from "./components/BuilderDialog";
import { ImageShowBackend } from "../showComponentsBackend/ImageShowBackend";
import { EmptyColumn } from "./components/EmptyColumn";
import { AddRowButton } from "./components/AddRowButton";
import { DialogForm, PossibleColumns, PossibleComponent } from "./types";
import {
  ExperimentSetupListShow,
  TextShow,
} from "frontend-components";

const initialStatus: DialogForm = undefined;

interface BuilderInputProps {
  source: string;
  project: number;
  possibleColumns?: PossibleColumns;
  possibleComponents?: PossibleComponent[];
  gap?: number | string;
}
export const BuilderInput = (props: BuilderInputProps) => {
  const { source, project, possibleColumns, possibleComponents, gap } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const {
    input: { onChange, value },
  } = useInput({
    source,
    defaultValue: useMemo(() => [], []),
  });

  const { setActiveItem, isOpenUpdateModal, closeModalUpdate, activeItem } =
    useDialoglUpdate<{ rowIndex: number; colIndex: number }>();

  const [dialogStatus, setDialogStatus] = useState<DialogForm>(initialStatus);

  const onCloseModal = () => {
    closeModalUpdate();
    setDialogStatus(initialStatus);
    setActiveStep(0);
  };

  const deleteRow = (rowIndex: number) => {
    const newRows = [...value];
    newRows.splice(rowIndex, 1);
    onChange(newRows);
  };

  const renderItem = (
    item: { type: PossibleComponent } & any,
    rowIndex: number,
    colIndex: number
  ) => {
    switch (item.type) {
      case "text": {
        return (
          <div
            style={{ cursor: "pointer", display: "flex", width: "100%" }}
            onClick={() => {
              setActiveStep(1);
              setDialogStatus(item.type);
              setActiveItem({ rowIndex, colIndex });
            }}
          >
            <TextShow text={item.content.text} />
          </div>
        );
      }
      case "listExperimentSetup": {
        return (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              width: "100%",
            }}
            onClick={() => {
              setActiveStep(1);
              setDialogStatus(item.type);
              setActiveItem({ rowIndex, colIndex });
            }}
          >
            <ExperimentSetupListShow
              title={item.content.title}
              subtitle={item.content.subtitle}
              list={item.content.list}
            />
          </div>
        );
      }
      case "image": {
        return (
          <div
            style={{ cursor: "pointer", display: "flex", width: "100%" }}
            onClick={() => {
              setActiveStep(1);
              setDialogStatus(item.type);
              setActiveItem({ rowIndex, colIndex });
            }}
          >
            <ImageShowBackend
              description={item.content.description}
              image={item.content.image}
              caption={item.content.caption}
              title={item.content.title}
              subtitle={item.content.subtitle}
              isWide={item.content.isWide}
            />
          </div>
        );
      }
    }
  };

  const renderRow = (row: any[], rowIndex: number) => {
    const nCols = row.length;
    const size = (12 / nCols) as GridSize;

    return (
      <Grid style={{ border: "1px solid black" }} key={rowIndex} container>
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
              renderItem(col, rowIndex, colIndex)
            )}
          </Grid>
        ))}
      </Grid>
    );
  };

  const updateItem = (content: any) => {
    if (activeItem) {
      const newRows = [...value];
      newRows[activeItem.rowIndex][activeItem.colIndex] = {
        type: dialogStatus,
        content: content,
      };
      onChange(newRows);
      onCloseModal();
    }
  };
  return value ? (
    <div>
      <AddRowButton
        possibleColumns={possibleColumns}
        onSubmit={(values) => {
          const newRows = [...value, new Array(values.cols).fill({})];
          onChange(newRows);
        }}
      />
      {value.map((row: any, index: number) => renderRow(row, index))}
      {activeItem && (
        <BuilderDialog
          onClose={onCloseModal}
          open={isOpenUpdateModal}
          dialogForm={dialogStatus}
          activeStep={activeStep}
          handleStep={setActiveStep}
          setDialogForm={setDialogStatus}
          project={project}
          content={value[activeItem.rowIndex][activeItem.colIndex].content}
          updateItem={updateItem}
          possibleComponents={possibleComponents}
        />
      )}
    </div>
  ) : null;
};
