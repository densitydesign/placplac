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
} from "@material-ui/core";
import IconCancel from "@material-ui/icons/Cancel";
import { Button, required } from "react-admin";
import { Form } from "react-final-form";
import { FormSaveButton } from "../../FormSaveButton";
import { CustomRichTextInput } from "../../CustomRichTextInput";
import { DialogForm, PossibleComponent } from "../types";
import { EditImage } from "./EditImage";
import { EditListExperimentSetup } from "./EditListExperimentSetup";
import arrayMutators from "final-form-arrays";

interface BuilderDialogProps {
  onClose: () => void;
  open: boolean;
  dialogForm: DialogForm;
  activeStep: number;
  handleStep: (index: number) => void;
  setDialogForm: (item: DialogForm) => void;
  project: number;
  content?: any;
  updateItem: (content: any) => void;
  possibleComponents?: PossibleComponent[];
}

export const BuilderDialog = (props: BuilderDialogProps) => {
  const steps = ["Select component", "Configure"];

  const {
    open,
    onClose,
    dialogForm,
    activeStep,
    handleStep,
    setDialogForm,
    project,
    content,
    updateItem,
    possibleComponents = ["image", "text"],
  } = props;

  const onSubmit = (values: any) => {
    if (dialogForm === "text") updateItem({ text: values.text });
    else if (dialogForm === "image") {
      const { title, subtitle, caption, image, isWide, description } = values;
      updateItem({ title, subtitle, caption, image, isWide, description });
    } else {
      updateItem(values);
    }
  };
  const getContent = () => {
    if (dialogForm === "text" || dialogForm === "listExperimentSetup")
      return content;
    if (dialogForm === "image") {
      const type: string[] = [];
      if (content?.title) type.push("title");
      if (content?.subtitle) type.push("subtitle");
      if (content?.caption) type.push("caption");
      if (content?.description) type.push("description");
      return { ...content, type };
    }
  };
  const renderPossibleComponents = () => {
    return possibleComponents.map((component) => (
      <Grid
        key={component}
        item
        onClick={() => {
          setDialogForm(component);
          handleStep(1);
        }}
      >
        <Card>
          <CardContent>
            <Typography>{component}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const renderForm = () => {
    switch (dialogForm) {
      case "text": {
        return (
          <CustomRichTextInput
            project={project}
            validate={required()}
            source="text"
          />
        );
      }
      case "image": {
        return <EditImage project={project} />;
      }
      case "listExperimentSetup": {
        return <EditListExperimentSetup />;
      }
      default:
        return null;
    }
  };
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xl">
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
            <Grid container alignItems="center">
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
        <Form
          mutators={{ ...arrayMutators }} // necessary for ArrayInput
          keepDirtyOnReinitialize
          initialValues={getContent()}
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, submitting }) => (
            <>
              <DialogContent>{renderForm()}</DialogContent>
              <DialogActions>
                <FormSaveButton
                  submitting={submitting}
                  pristine={pristine}
                  handleSubmit={handleSubmit}
                />
              </DialogActions>
            </>
          )}
        />
      )}
    </Dialog>
  );
};
