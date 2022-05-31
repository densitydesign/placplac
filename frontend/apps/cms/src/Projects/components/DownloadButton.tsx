import { useState } from 'react';
import CloudDownload from '@mui/icons-material/CloudDownload';
import {
  Button,
  useNotify,
  useLoading,
  TextInput,
  RecordContextProvider,
  Form,
  SaveContextProvider,
  useRefresh,
  SaveButton,
} from 'react-admin';
import { clientNoJson } from '../../dataProvider';
import { url } from '../../constants';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useToggler } from '../../useToggler';
import IconCancel from '@mui/icons-material/Cancel';
import { FieldValues } from 'react-hook-form';
import { Project } from '../../types';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { FormSaveButton } from '../../components/FormSaveButton';
interface DownloadButtonProps {
  project: Project;
}

export const DownloadButton = (props: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const mainIsLoading = useLoading();
  const notify = useNotify();
  const { value, setTrue, setFalse } = useToggler();
  const refresh = useRefresh();
  const forceDisabled = !props.project.last_build_time
    ? false
    : new Date(props.project.last_build_time) >
      new Date(props.project.last_update)
    ? true
    : false;
  const onClick = (values: FieldValues) => {
    console.log(values);
    setLoading(true);
    clientNoJson(`${url}/projects/${props.project?.id}/export/`, {
      method: 'POST',
      data: { base_path: values?.base_path },
      responseType: 'blob',
    })
      .then((response) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response.data);
        a.href = url;
        a.download = `${props.project?.title}.zip`;
        document.body.append(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        refresh();
      })
      .catch((e) => {
        console.log(e);
        notify('ra.notification.http_error', { type: 'error' });
      })
      .finally(() => {
        setLoading(false);
        setFalse();
      });
  };
  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setTrue();
        }}
        label="Build"
        disabled={loading || mainIsLoading}
      >
        {loading ? (
          <CircularProgress size={18} thickness={2} />
        ) : (
          <CloudDownload />
        )}
      </Button>

      <Dialog
        onClick={(e) => e.stopPropagation()}
        maxWidth="sm"
        fullWidth
        open={value}
      >
        <SaveContextProvider value={{ saving: loading, save: onClick }}>
          <RecordContextProvider value={{ base_path: '' }}>
            <Form onSubmit={onClick}>
              <>
                <DialogContent>
                  {loading ? (
                    <>
                      <Typography variant="h6">Building ...</Typography>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                      </Box>
                    </>
                  ) : (
                    <>
                      {props.project.last_build && (
                        <>
                          <Typography variant="h6">
                            Download latest build:{' '}
                            <a
                              href={props.project.last_build}
                              download
                              title="download"
                            >
                              {new Date(
                                props.project.last_build_time!
                              ).toLocaleString()}
                            </a>
                          </Typography>
                          {!forceDisabled && (
                            <Typography
                              my={2}
                              variant="subtitle1"
                              align="center"
                            >
                              or build a new release
                            </Typography>
                          )}
                        </>
                      )}
                      {!forceDisabled && (
                        <TextInput
                          source="base_path"
                          label="Base directory of project"
                          placeholder="Write the subdirectory ex: /subdirectory"
                          helperText={
                            'If the project will be hosted on a subdirectory, write the subdirectory name otherwise leave the field empty. Ex: /subfolder'
                          }
                        />
                      )}
                    </>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    label="ra.action.cancel"
                    onClick={setFalse}
                    disabled={loading}
                  >
                    <IconCancel />
                  </Button>

                  {!forceDisabled && (
                    <FormSaveButton disabled={forceDisabled} label="Build" />
                  )}
                </DialogActions>
              </>
            </Form>
          </RecordContextProvider>
        </SaveContextProvider>
      </Dialog>
    </>
  );
};
