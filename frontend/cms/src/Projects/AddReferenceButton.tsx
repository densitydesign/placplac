import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import {
  Button,
  FormWithRedirect,
  SaveButton,
  useMutation,
  useNotify,
  useRecordContext,
  Record,
  useRedirect,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import { useToggler } from "../useToggler";
import { CustomRichTextInput } from "../components/CustomRichTextInput";

interface AddReferenceButtonProps {
  refersTo: "project" | "experiment";
}
export const AddReferenceButton = (props: AddReferenceButtonProps) => {
  const { refersTo } = props;
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id } = record;
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
      <Dialog maxWidth="sm" fullWidth open={value} disableEnforceFocus>
        <FormWithRedirect
          resource="references"
          initialValues={{ [refersTo]: id }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <CustomRichTextInput
                  source="description"
                  label="Description of reference"
                  small
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
