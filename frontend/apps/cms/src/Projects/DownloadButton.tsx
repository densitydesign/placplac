import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';
import CloudDownload from '@material-ui/icons/CloudDownload';
import {
  Button,
  useNotify,
  Record,
  useLoading,
  FormWithRedirect,
  SaveButton,
  TextInput,
} from 'react-admin';
import { clientNoJson } from '../dataProvider';
import { url } from '../constants';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useToggler } from '../useToggler';
import IconCancel from '@material-ui/icons/Cancel';

interface DownloadButtonProps {
  project?: Record;
}

export const DownloadButton = (props: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const mainIsLoading = useLoading();
  const notify = useNotify();
  const { value, setTrue, setFalse } = useToggler();

  const onClick = (values: any) => {
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
      })
      .catch((e) => {
        console.log(e);
        notify('ra.notification.http_error', 'error');
      })
      .finally(() => {
        setLoading(false);
        setFalse();
      });
  };
  return (
    <>
      <Prompt
        when={loading}
        message="You are downloading your project, are you sure you want to leave?"
      />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setTrue();
        }}
        label="Build"
        title="Build and download the project"
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
        <FormWithRedirect
          save={onClick}
          saving={loading}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <TextInput
                  source="base_path"
                  label="Base directory of project"
                  placeholder="Write the subdirectory ex: /subdirectory"
                  helperText={
                    'If the project will be hosted on a subdirectory, write the subdirectory name otherwise leave the field empty. Ex: /subfolder'
                  }
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
                  label="Build"
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
