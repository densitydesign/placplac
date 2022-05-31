import React, { useMemo, useState } from 'react';
import { useDialoglUpdate } from '../../useDialogUpdate';
import {
  required,
  useInput,
  SelectInput,
  TextInput,
  BooleanInput,
  useNotify,
} from 'react-admin';
import { BuilderDialog } from './components/BuilderDialog';
import { AddRowButton } from './components/AddRowButton';

import { Row } from './components/Row';
import { CustomRichTextInput } from '../CustomRichTextInput';
import { EditImage } from './components/EditImage';
import { SHOW_COMPONENTS_BUILDER } from '@algocount/ui-site';
import { EditListExperimentSetup } from './components/EditListExperimentSetup';
import { EditIframe } from './components/EditIframe';
import { Grid } from '@mui/material';
import { SelectFile } from '../SelectFile';
import { BuilderBlocks, RowType } from '@algocount/shared/types';
import SimpleReactLightbox from 'simple-react-lightbox';
import { Box } from '@mui/material';
import { useProjectContext } from '../../contexts/project-context';
import { useGlossaryAdjuster } from 'libs/ui-site/src/lib/hooks';
interface BuilderInputProps {
  source: string;
  possibleComponents?: string[];
  canDivided: boolean;
  isStep?: boolean;
}

export const BuilderInput = (props: BuilderInputProps) => {
  const { glossaryTerms, project } = useProjectContext();
  const notify = useNotify();
  if (!project)
    throw Error('This component must be used in initialized ProjectContext');
  const { source, possibleComponents, canDivided, isStep = false } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const {
    field: { onChange, value: noTypeValue },
  } = useInput({
    source,
    defaultValue: useMemo(() => [], []),
  });
  const value = noTypeValue as RowType[];
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
  const switchDivided = (rowIndex: number) => {
    const newRows = [...value];
    newRows[rowIndex].divided = !newRows[rowIndex].divided;
    onChange(newRows);
  };
  const moveCellLeft = (rowIndex: number, cellIndex: number) => {
    const newRows = [...value];
    const newIndex = cellIndex - 1;
    if (newIndex >= 0) {
      const movingElement = newRows[rowIndex].cols.splice(cellIndex, 1)[0];
      newRows[rowIndex].cols.splice(newIndex, 0, movingElement);
      onChange(newRows);
    }
  };
  const moveCellRight = (rowIndex: number, cellIndex: number) => {
    const newRows = [...value];
    const newIndex = cellIndex + 1;
    if (newIndex < value[rowIndex].cols.length) {
      const movingElement = newRows[rowIndex].cols.splice(cellIndex, 1)[0];
      newRows[rowIndex].cols.splice(newIndex, 0, movingElement);
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
    newRows[rowIndex].cols.splice(cellIndex, 1);
    if (newRows[rowIndex].cols.length <= 0) {
      newRows.splice(rowIndex, 1);
    }
    onChange(newRows);
  };
  const addCell = (rowIndex: number) => {
    const newRows = [...value];
    const numOfRows = newRows[rowIndex].cols.length;
    if (numOfRows < 4) {
      newRows[rowIndex].cols.splice(numOfRows - 1, 0, []);
      onChange(newRows);
    } else {
      notify('Max number of columns reached!');
    }
  };
  const onColumnClick = (type: any, rowIndex: number, colIndex: number) => {
    setActiveStep(1);
    setDialogStatus(type);
    setActiveItem({ rowIndex, colIndex });
  };

  const updateItem = (content: any) => {
    if (activeItem) {
      const newRows = [...value];
      newRows[activeItem.rowIndex].cols[activeItem.colIndex] = {
        type: dialogStatus,
        content: content,
      };
      onChange(newRows);
      onCloseModal();
    }
  };

  const builderBlocks = useMemo(() => {
    const builderBlocks: BuilderBlocks = {
      pdf: {
        ...SHOW_COMPONENTS_BUILDER.pdf,
        form: {
          component: (
            <Grid container direction="column">
              <Grid item>
                <SelectFile
                  type="file"
                  label={'Select pdf file'}
                  source={'pdfUrl'}
                  project={project}
                  fullWidth
                  validate={[required()]}
                />
              </Grid>
            </Grid>
          ),
        },
      },
      video: {
        ...SHOW_COMPONENTS_BUILDER.video,
        form: {
          component: (
            <Grid container direction="column">
              <Grid item>
                <SelectFile
                  type="video"
                  label={'Video file'}
                  source={'src'}
                  project={project}
                  fullWidth
                  validate={[required()]}
                  helperText="Click the right button to choose a video file from the library"
                />
              </Grid>
              <Grid item>
                <TextInput
                  validate={required()}
                  helperText={false}
                  fullWidth
                  source={'height'}
                />
              </Grid>
              <Grid item container direction="row">
                <Grid item>
                  <BooleanInput
                    defaultValue={false}
                    validate={required()}
                    helperText={false}
                    fullWidth
                    source={'autoplay'}
                  />
                </Grid>
                <Grid item>
                  <BooleanInput
                    defaultValue={true}
                    validate={required()}
                    helperText={false}
                    fullWidth
                    source={'muted'}
                  />
                </Grid>
                <Grid item>
                  <BooleanInput
                    defaultValue={true}
                    validate={required()}
                    helperText={false}
                    fullWidth
                    source={'controls'}
                  />
                </Grid>
              </Grid>
            </Grid>
          ),
        },
      },
      image: {
        ...(isStep
          ? SHOW_COMPONENTS_BUILDER.image_step
          : SHOW_COMPONENTS_BUILDER.image),
        form: {
          component: <EditImage project={project} />,

          getInitialContent: (content: any) => {
            const type: string[] = [];
            if (content?.title) type.push('title');
            if (content?.subtitle) type.push('subtitle');
            if (content?.caption) type.push('caption');
            if (content?.description) type.push('description');
            return {
              title: content?.title,
              caption: content?.caption,
              description: content?.description,
              subtitle: content?.subtitle,
              type,
              isWide: content?.isWide,
              image: content?.image,
            };
          },
          getSaveContent: (values: any) => {
            const { title, subtitle, caption, image, isWide, description } =
              values;
            return {
              title: title,
              subtitle: subtitle,
              caption: caption,
              image,
              isWide,
              description: description,
            };
          },
        },
      },
      text: {
        ...SHOW_COMPONENTS_BUILDER.text,
        form: {
          component: (
            <CustomRichTextInput validate={[required()]} source="text" />
          ),

          getSaveContent: (values: any) => {
            return { text: values.text };
          },
        },
      },
      disclaimer: {
        ...SHOW_COMPONENTS_BUILDER.disclaimer,
        form: {
          component: (
            <Grid container direction="column">
              <Grid item>
                <SelectInput
                  choices={[
                    { id: 'alert', name: 'Alert' },
                    { id: 'info', name: 'Info' },
                    { id: 'notes', name: 'Notes' },
                  ]}
                  validate={[required()]}
                  helperText={false}
                  fullWidth
                  source={'type_bi'}
                  label="Type"
                />
              </Grid>
              <Grid item>
                <CustomRichTextInput
                  validate={[required()]}
                  helperText={false}
                  fullWidth
                  source={'description_bi'}
                  label="Description"
                />
              </Grid>
            </Grid>
          ),
          getInitialContent: (content: any) => {
            return {
              description_bi: content?.description,
              type_bi: content?.type,
            };
          },
          getSaveContent: (values: any) => {
            const { type_bi, description_bi } = values;
            return {
              type: type_bi,
              description: description_bi,
            };
          },
        },
      },
      listExperimentSetup: {
        ...SHOW_COMPONENTS_BUILDER.listExperimentSetup,
        form: {
          component: <EditListExperimentSetup />,
          getInitialContent: (content: any) => {
            return {
              title_bi: content?.title,
              subtitle_bi: content?.subtitle,
              list_bi: content?.list,
            };
          },
          getSaveContent: (values: any) => {
            const { title_bi, subtitle_bi, list_bi } = values;
            return {
              title: title_bi,
              subtitle: subtitle_bi,
              list: list_bi,
            };
          },
        },
      },
      iframe: {
        ...SHOW_COMPONENTS_BUILDER.iframe,
        form: {
          component: <EditIframe />,
        },
      },
      sigma: {
        ...SHOW_COMPONENTS_BUILDER.sigma,
        form: {
          component: (
            <Grid container direction="column">
              <Grid item>
                <SelectFile
                  type="file"
                  label={'Gexf file'}
                  source={'gexfFile'}
                  project={project}
                  fullWidth
                  validate={[required()]}
                  helperText="Click the right button to choose a file from the library"
                />
              </Grid>
              <Grid item>
                <TextInput helperText={false} fullWidth source={'height'} />
              </Grid>
            </Grid>
          ),
        },
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
  }, [possibleComponents, project]);

  useGlossaryAdjuster(glossaryTerms);
  return (
    <SimpleReactLightbox>
      <Box width="100%">
        <AddRowButton
          canDivided={canDivided}
          onSubmit={(values) => {
            const newRows = [
              ...value,
              {
                cols: new Array(values.cols).fill({}),
                divided: values.divided,
              },
            ];
            onChange(newRows);
          }}
        />
        <div style={{ border: '1px solid black' }}>
          {value &&
            value.map((row: any, index: number) => (
              <Row
                canDivided={canDivided}
                switchDivided={switchDivided}
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
                addCell={addCell}
              />
            ))}
        </div>

        {activeItem && (
          <BuilderDialog
            onClose={onCloseModal}
            open={isOpenUpdateModal}
            dialogForm={dialogStatus}
            activeStep={activeStep}
            handleStep={setActiveStep}
            setDialogForm={setDialogStatus}
            content={
              value[activeItem.rowIndex].cols[activeItem.colIndex].content
            }
            updateItem={updateItem}
            builderBlocks={builderBlocks}
          />
        )}
      </Box>
    </SimpleReactLightbox>
  );
};
