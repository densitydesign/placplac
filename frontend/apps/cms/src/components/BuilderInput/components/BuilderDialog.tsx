import {
  Dialog,
  DialogTitle,
  Stepper,
  Step,
  StepButton,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  DialogActions,
} from '@mui/material';
import IconCancel from '@mui/icons-material/Cancel';
import { Button, Form, RecordContextProvider, SaveButton } from 'react-admin';

import React from 'react';
import { BuilderBlocks } from '@algocount/shared/types';

interface BuilderDialogProps {
  onClose: () => void;
  open: boolean;
  dialogForm: string | undefined;
  activeStep: number;
  handleStep: (index: number) => void;
  setDialogForm: (item: string | undefined) => void;
  content?: any;
  updateItem: (content: any) => void;

  builderBlocks: BuilderBlocks;
}

export const BuilderDialog = (props: BuilderDialogProps) => {
  const steps = ['Select component', 'Configure'];
  const {
    open,
    onClose,
    dialogForm,
    activeStep,
    handleStep,
    setDialogForm,
    content,
    updateItem,
    builderBlocks,
  } = props;

  const onSubmit = (values: any) => {
    let newValues = values;
    if (typeof builderBlocks[dialogForm!].form.getSaveContent !== 'undefined') {
      newValues = builderBlocks[dialogForm!].form.getSaveContent!(values);
    }
    updateItem(newValues);
  };

  const getContent = () => {
    if (
      typeof builderBlocks[dialogForm!].form.getInitialContent !== 'undefined'
    ) {
      return builderBlocks[dialogForm!].form.getInitialContent!(content);
    }
    return content;
  };

  const renderPossibleComponents = () => {
    return Object.keys(builderBlocks).map((blocKey) => {
      const builderBlock = builderBlocks[blocKey];
      return (
        <Grid
          key={blocKey}
          item
          onClick={() => {
            setDialogForm(blocKey);
            handleStep(1);
          }}
        >
          <Card>
            <CardContent>
              <Typography>{builderBlock.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Dialog
      disableEnforceFocus={true}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step disabled={index === 1 && !dialogForm} key={label}>
                <StepButton onClick={() => handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </DialogTitle>
      {activeStep === 0 && (
        <>
          <DialogContent>
            <Grid container spacing={2} alignItems="center">
              {renderPossibleComponents()}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button label="ra.action.cancel" onClick={onClose}>
              <IconCancel />
            </Button>
          </DialogActions>
        </>
      )}
      {activeStep === 1 && (
        <RecordContextProvider value={getContent()}>
          <Form onSubmit={onSubmit}>
            <DialogContent>
              {React.cloneElement(builderBlocks[dialogForm!].form.component, {
                ...builderBlocks[dialogForm!].form.component.props,
              })}
            </DialogContent>
            <DialogActions>
              <SaveButton />
            </DialogActions>
          </Form>
        </RecordContextProvider>
      )}
    </Dialog>
  );
};
