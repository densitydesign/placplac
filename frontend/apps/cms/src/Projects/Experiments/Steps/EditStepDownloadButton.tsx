import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  Button,
  SaveButton,
  TextInput,
  useNotify,
  useRecordContext,
  RaRecord,
  required,
  maxLength,
  useListContext,
  Form,
  useDataProvider,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Edit';
import { useToggler } from '../../../useToggler';
import { useMutation } from 'react-query';
import { FieldValue, FieldValues } from 'react-hook-form';
import { CustomDataProvider } from '../../../dataProvider';

export const EditStepDownloadButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const record = useRecordContext();
  const { mutate, isLoading } = useMutation(
    ['step-downloads', record.id],
    (values: FieldValues) =>
      dataProvider.updateMultipart('step-downloads', {
        data: values,
        id: record.id,
        previousData: {},
      }),
    {
      onSuccess: (data) => {
        setFalse();
        notify('ra.notification.updated', {
          type: 'success',
          messageArgs: { smart_count: 1 },
        });
        refetch();
      },
      onError: (error) => {
        notify('ra.page.error', { type: 'error' });
      },
    }
  );

  const notify = useNotify();
  const { refetch } = useListContext();
  const dataProvider = useDataProvider<CustomDataProvider>();
  const onSave = (values: Partial<RaRecord>) => mutate(values);

  return (
    <>
      <Button onClick={setTrue} label="Edit">
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <Form defaultValues={record} onSubmit={onSave}>
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
                disabled={isLoading}
              >
                <IconCancel />
              </Button>
              <SaveButton />
            </DialogActions>
          </>
        </Form>
      </Dialog>
    </>
  );
};
