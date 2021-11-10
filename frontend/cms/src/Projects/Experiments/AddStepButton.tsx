import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import {
  Button,
  FormWithRedirect,
  SaveButton,
  TextInput,
  useMutation,
  useNotify,
  useRecordContext,
  Record,
  useRedirect,
  required,
  NumberInput,
  maxLength,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import { useToggler } from "../../useToggler";

export const AddStepButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: experiment } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = (values: Partial<Record>) =>
    mutate(
      {
        type: "create",
        resource: "steps",
        payload: { data: values },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          redirect("edit", "/steps", data.id);
        },
        onFailure: (error) => {
          notify("ra.page.error", "error");
        },
      }
    );

  return (
    <>
      <Button
        style={{ marginBottom: "10px" }}
        onClick={setTrue}
        label="Add step"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="steps"
          initialValues={{ experiment }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <NumberInput source="step_number" validate={[required()]} />
                <TextInput
                  multiline
                  fullWidth
                  source="title"
                  validate={[required(), maxLength(255)]}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  label="ra.action.cancel"
                  onClick={setFalse}
                  disabled={loading}
                >
                  <IconCancel />
                </Button>
                <SaveButton
                  handleSubmitWithRedirect={handleSubmitWithRedirect}
                  saving={saving}
                  disabled={loading}
                />
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
};
