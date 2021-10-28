import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import {
  Button,
  Create,
  CreateProps,
  FileField,
  FileInput,
  FormWithRedirect,
  ImageField,
  ImageInput,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  useCreate,
  useDataProvider,
  useMutation,
  useNotify,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import { useToggler } from "../useToggler";

interface Props {
  project: number;
}
export const ProjectMediaDialogCreate = ({ project }: Props) => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const notify = useNotify();
  return (
    <>
      <Button onClick={setTrue} label="Add image">
        <IconContentAdd />
      </Button>
      <Dialog open={value}>
        <FormWithRedirect
          resource="media"
          defaultValue={{ project }}
          save={(values) => {
            mutate(
              {
                type: "createMultipart",
                resource: "media",
                payload: { data: values },
              },
              {
                onSuccess: () => {
                  setFalse();
                },
                onFailure: ({ error }) => {
                  notify(error.message, "error");
                },
              }
            );
          }}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <ImageInput validate={required()} source="file">
                  <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput source="description" />
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
