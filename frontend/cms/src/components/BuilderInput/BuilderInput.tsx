import React, { useMemo, useState } from "react";
import { useDialoglUpdate } from "../../useDialogUpdate";
import { useInput } from "react-admin";
import { BuilderDialog } from "./components/BuilderDialog";
import { AddRowButton } from "./components/AddRowButton";
import { BuilderBlock, DialogForm, PossibleColumns } from "./types";
import { Row } from "./components/Row";

interface BuilderInputProps {
  source: string;
  possibleColumns?: PossibleColumns;
  possibleComponents?: BuilderBlock[];
  glossaryTermsIds: number[];
  referencesIds: number[];
  project: number;
}

export const BuilderInput = (props: BuilderInputProps) => {
  const {
    source,
    possibleColumns,
    possibleComponents,
    glossaryTermsIds,
    referencesIds,
    project,
  } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const {
    input: { onChange, value },
  } = useInput({
    source,
    defaultValue: useMemo(() => [], []),
  });

  const { setActiveItem, isOpenUpdateModal, closeModalUpdate, activeItem } =
    useDialoglUpdate<{ rowIndex: number; colIndex: number }>();

  const [dialogStatus, setDialogStatus] = useState<DialogForm>(undefined);

  const onCloseModal = () => {
    closeModalUpdate();
    setDialogStatus(undefined);
    setActiveStep(0);
  };

  const deleteRow = (rowIndex: number) => {
    const newRows = [...value];
    newRows.splice(rowIndex, 1);
    onChange(newRows);
  };
  const moveCellLeft = (rowIndex: number, cellIndex: number) => {
    const newRows = [...value];
    const newIndex = cellIndex - 1;
    if (newIndex >= 0) {
      const movingElement = newRows[rowIndex].splice(cellIndex, 1)[0];
      newRows[rowIndex].splice(newIndex, 0, movingElement);
      onChange(newRows);
    }
  };
  const moveCellRight = (rowIndex: number, cellIndex: number) => {
    const newRows = [...value];
    const newIndex = cellIndex + 1;
    if (newIndex < value[rowIndex].length) {
      const movingElement = newRows[rowIndex].splice(cellIndex, 1)[0];
      newRows[rowIndex].splice(newIndex, 0, movingElement);
      onChange(newRows);
    }
  };
  const moveRowDown = (rowIndex: number) => {
    const newRows = [...value];
    const newIndex = rowIndex + 1;
    if (newIndex < value.length) {
      const movingElement = newRows.splice(rowIndex, 1)[0];
      newRows.splice(newIndex, 0, movingElement);
      onChange(newRows);
    }
  };
  const moveRowUp = (rowIndex: number) => {
    const newRows = [...value];
    const newIndex = rowIndex - 1;
    if (newIndex >= 0) {
      const movingElement = newRows.splice(rowIndex, 1)[0];
      newRows.splice(newIndex, 0, movingElement);
      onChange(newRows);
    }
  };
  const removeCell = (rowIndex: number, cellIndex: number) => {
    const newRows = [...value];
    newRows[rowIndex].splice(cellIndex, 1);
    if (newRows[rowIndex].length <= 0) {
      newRows.splice(rowIndex, 1);
    }
    onChange(newRows);
  };
  const onColumnClick = (
    type: BuilderBlock,
    rowIndex: number,
    colIndex: number
  ) => {
    setActiveStep(1);
    setDialogStatus(type);
    setActiveItem({ rowIndex, colIndex });
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

  return (
    <div>
      <AddRowButton
        possibleColumns={possibleColumns}
        onSubmit={(values) => {
          const newRows = [...value, new Array(values.cols).fill({})];
          onChange(newRows);
        }}
      />
      {value &&
        value.map((row: any, index: number) => (
          <Row
            deleteCell={removeCell}
            moveCellLeft={moveCellLeft}
            moveRowDown={moveRowDown}
            moveRowUp={moveRowUp}
            moveCellRight={moveCellRight}
            key={index}
            row={row}
            setActiveItem={setActiveItem}
            onColumnClick={onColumnClick}
            rowIndex={index}
            deleteRow={deleteRow}
          />
        ))}
      {activeItem && (
        <BuilderDialog
          project={project}
          onClose={onCloseModal}
          open={isOpenUpdateModal}
          dialogForm={dialogStatus}
          activeStep={activeStep}
          handleStep={setActiveStep}
          setDialogForm={setDialogStatus}
          glossaryTermsIds={glossaryTermsIds}
          referencesIds={referencesIds}
          content={value[activeItem.rowIndex][activeItem.colIndex].content}
          updateItem={updateItem}
          possibleComponents={possibleComponents}
        />
      )}
    </div>
  );
};
