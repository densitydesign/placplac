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
  useListContext,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Edit";
import { useToggler } from "../../../useToggler";

export const EditStepDownloadButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();

  const notify = useNotify();
  const { refetch } = useListContext();
  const onSave = (values: Partial<Record>) =>
    mutate(
      {
        type: "updateMultipart",
        resource: "step-downloads",
        payload: { data: values, id: record.id },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          notify("ra.notification.updated", "success", { smart_count: 1 });
          refetch();
        },
        onFailure: (error) => {
          notify("ra.page.error", "error");
        },
      }
    );

  return (
    <>
      <Button onClick={setTrue} label="Edit">
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="steps"
          initialValues={record}
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
