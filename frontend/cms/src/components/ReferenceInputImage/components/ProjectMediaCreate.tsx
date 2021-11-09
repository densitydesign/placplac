import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import {
  Button,
  FormWithRedirect,
  ImageField,
  ImageInput,
  required,
  SaveButton,
  TextInput,
  useMutation,
  useNotify,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import IconContentAdd from "@material-ui/icons/Add";
import { useToggler } from "../../../useToggler";
import { useForm } from "react-final-form";

interface Props {
  project: number;
  source: string;
  onChange: () => void;
}
export const ProjectMediaDialogCreate = ({
  project,
  source,
  onChange,
}: Props) => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const form = useForm();

  const notify = useNotify();
  return (
    <>
      <Button onClick={setTrue} label="Add image">
        <IconContentAdd />
      </Button>
      <Dialog open={value}>
        <FormWithRedirect
          resource="media"
          defaultValue={{ project, type: "image" }}
          save={(values) => {
            mutate(
              {
                type: "createMultipart",
                resource: "media",
                payload: { data: values },
              },
              {
                onSuccess: (data) => {
                  form.change(source, data.id);
                  onChange();
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
