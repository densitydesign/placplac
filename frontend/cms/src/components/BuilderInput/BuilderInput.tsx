import React, { useMemo, useState } from "react";
import { useDialoglUpdate } from "../../useDialogUpdate";
import { useInput } from "react-admin";
import { BuilderDialog } from "./components/BuilderDialog";
import { AddRowButton } from "./components/AddRowButton";
import { DialogForm, PossibleColumns, PossibleComponent } from "./types";
import { Row } from "./components/Row";

interface BuilderInputProps {
  source: string;
  project: number;
  possibleColumns?: PossibleColumns;
  possibleComponents?: PossibleComponent[];
  gap?: number | string;
}

export const BuilderInput = (props: BuilderInputProps) => {
  const { source, project, possibleColumns, possibleComponents } = props;
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

  const onColumnClick = (
    type: PossibleComponent,
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
  );
};
