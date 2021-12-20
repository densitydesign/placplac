import React, { useMemo, useState } from "react";
import { useDialoglUpdate } from "../../useDialogUpdate";
import { required, useInput, SelectInput, TextInput } from "react-admin";
import { BuilderDialog } from "./components/BuilderDialog";
import { AddRowButton } from "./components/AddRowButton";
import { BuilderBlocks, PossibleColumns } from "./types";
import { Row } from "./components/Row";
import { CustomRichTextInput } from "../CustomRichTextInput";
import { EditImage } from "./components/EditImage";
import {
  Disclaimer,
  ExperimentSetupListShow,
  IFrame,
  ImageShow,
  SigmaShow,
  TextShow,
} from "frontend-components";
import { EditListExperimentSetup } from "./components/EditListExperimentSetup";
import { EditIframe } from "./components/EditIframe";
import { Grid } from "@material-ui/core";
import { SelectFile } from "../SelectFile";

interface BuilderInputProps {
  source: string;
  possibleColumns?: PossibleColumns;
  possibleComponents?: string[];
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

  const [dialogStatus, setDialogStatus] = useState<string>();

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
  const onColumnClick = (type: any, rowIndex: number, colIndex: number) => {
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

  const builderBlocks = useMemo(() => {
    const builderBlocks: BuilderBlocks = {
      image: {
        description: "Image",
        form: {
          component: <EditImage project={project} />,

          getInitialContent: (content: any) => {
            const type: string[] = [];
            if (content?.title) type.push("title");
            if (content?.subtitle) type.push("subtitle");
            if (content?.caption) type.push("caption");
            if (content?.description) type.push("description");
            return { ...content, type };
          },
          getSaveContent: (values: any) => {
            const { title, subtitle, caption, image, isWide, description } =
              values;
            return { title, subtitle, caption, image, isWide, description };
          },
        },
        render: (content: any) => (
          <ImageShow
            description={content.description}
            image={content.image}
            caption={content.caption}
            title={content.title}
            subtitle={content.subtitle}
            isWide={content.isWide}
          />
        ),
      },
      text: {
        description: "Text editor",

        form: {
          component: (
            <CustomRichTextInput
              referencesIds={referencesIds}
              glossaryTermsIds={glossaryTermsIds}
              validate={[required()]}
              source="text"
            />
          ),

          getSaveContent: (values: any) => {
            return { text: values.text };
          },
        },
        render: (content: any) => <TextShow text={content.text} />,
      },
      disclaimer: {
        description: "Disclaimer",
        form: {
          component: (
            <Grid container direction="column">
              <Grid item>
                <SelectInput
                  choices={[
                    { id: "alert", name: "Alert" },
                    { id: "info", name: "Info" },
                    { id: "notes", name: "Notes" },
                  ]}
                  validate={[required()]}
                  helperText={false}
                  fullWidth
                  source={"type"}
                />
              </Grid>
              <Grid item>
                <TextInput
                  validate={[required()]}
                  helperText={false}
                  fullWidth
                  source={"description"}
                />
              </Grid>
            </Grid>
          ),
        },
        render: (content: any) => (
          <Disclaimer
            description={content.description}
            disclaimerType={content.type}
          />
        ),
      },
      listExperimentSetup: {
        description: "Experiment setup card",
        form: {
          component: <EditListExperimentSetup />,
        },
        render: (content: any) => (
          <ExperimentSetupListShow
            title={content.title}
            subtitle={content.subtitle}
            list={content.list}
          />
        ),
      },
      iframe: {
        description: "Embed block",
        form: {
          component: <EditIframe />,
        },
        render: (content: any) => (
          <IFrame src={content.src} height={content.height} />
        ),
      },
      sigma: {
        description: "Sigma gexf file",
        form: {
          component: (
            <Grid container direction="column">
              <Grid item>
                <SelectFile
                  type="file"
                  label={"Gexf file"}
                  source={"gexfFile"}
                  project={project}
                  fullWidth
                  validate={[required()]}
                />
              </Grid>
              <Grid item>
                <TextInput helperText={false} fullWidth source={"height"} />
              </Grid>
            </Grid>
          ),
        },
        render: (content: any) => (
          <SigmaShow height={content.height} gexfPath={content.gexfFile} />
        ),
      },
    };
    return possibleComponents
      ? possibleComponents.reduce((filtered, possibleComponent) => {
          if (possibleComponent in builderBlocks) {
            filtered[possibleComponent] = builderBlocks[possibleComponent];
          }
          return filtered;
        }, {} as BuilderBlocks)
      : builderBlocks;
  }, [glossaryTermsIds, possibleComponents, project, referencesIds]);

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
            builderBlocks={builderBlocks}
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
          content={value[activeItem.rowIndex][activeItem.colIndex].content}
          updateItem={updateItem}
          builderBlocks={builderBlocks}
        />
      )}
    </div>
  );
};
