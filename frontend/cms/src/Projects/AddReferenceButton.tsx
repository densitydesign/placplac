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
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import { useToggler } from "../useToggler";

export const AddReferenceButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = (values: Partial<Record>) =>
    mutate(
      {
        type: "create",
        resource: "references",
        payload: { data: values },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          redirect("edit", "/references", data.id);
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
        label="Add reference"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="references"
          initialValues={{ project }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <TextInput
                  multiline
                  fullWidth
                  source="title"
                  validate={[required()]}
                />
              
                <TextInput multiline fullWidth source="link" />
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
