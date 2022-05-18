import { useState } from 'react';
import {
  Button,
  useNotify,
  useLoading,
  Identifier,
} from 'react-admin';
import { clientNoJson } from '../dataProvider';
import { url } from '../constants';
import { CircularProgress } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
interface ExportButtonProps {
  projectId?: Identifier;
}

export const ExportButton = (props: ExportButtonProps) => {
  const [loading, setLoading] = useState(false);
  const mainIsLoading = useLoading();
  const notify = useNotify();

  const onClick = () => {
    setLoading(true);
    clientNoJson(
      `${url}/projects/${props.projectId}/export_to_importable_format/`,
      {
        method: 'GET',
        responseType: 'blob',
      }
    )
      .then((response) => {
        console.log(response);
        const contentDisposition = response.headers['content-disposition'];
        console.log(contentDisposition);
        const filename = contentDisposition.split('filename=')[1].split(';')[0];
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response.data);
        a.href = url;
        a.download = filename;
        document.body.append(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((e) => {
        console.log(e);
        notify('ra.notification.http_error', { type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      label="Export project"
      disabled={loading || mainIsLoading}
    >
      {loading ? (
        <CircularProgress size={18} thickness={2} />
      ) : (
        <SystemUpdateAltIcon />
      )}
    </Button>
  );
};
