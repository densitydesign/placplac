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
  required,
  maxLength,
  FileInput,
  FileField,
  useEditContext,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import { useToggler } from "../../../useToggler";

export const AddStepDownloadButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: step } = record;
  const notify = useNotify();
  const { refetch } = useEditContext();
  const onSave = (values: Partial<Record>) =>
    mutate(
      {
        type: "createMultipart",
        resource: "step-downloads",
        payload: { data: values },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          refetch && refetch();
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
        label="Add download"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="steps"
          initialValues={{ step }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <TextInput
                  multiline
                  fullWidth
                  source="title"
                  label="Title"
                  placeholder="Type the download title, for example 'Download dataset'"
                  helperText="The download title"
                  validate={[required(), maxLength(150)]}
                />
                <FileInput source="file" validate={[required()]}>
                  <FileField source="src" title="title" />
                </FileInput>
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
