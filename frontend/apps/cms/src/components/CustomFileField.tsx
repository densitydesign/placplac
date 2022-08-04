import { CircularProgress, Link } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { useNotify, useRecordContext } from 'react-admin';
import { clientNoJson } from '../dataProvider';

function getFileNameFromContentDisposition(contentDisposition: any) {
  if (!contentDisposition) return null;

  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match ? match[1] : null;
}

interface Props {
  title: string;
  source: string;
  multiple?: boolean;
}
export const CustomFileField = (props: Props) => {
  const { title, source } = props;
  const record = useRecordContext(props);
  const [loading, setLoading] = React.useState(false);
  const notify = useNotify();
  const handleClick = async () => {
    setLoading(true);

    let res = null;
    const urlDownload = get(record, source);
    try {
      // add any additional headers, such as authorization, as the second parameter to get below
      // also, remember to use responseType: 'blob' if working with blobs instead, and use res.blob() instead of res.data below
      res = await clientNoJson(`${urlDownload}`, {
        responseType: 'arraybuffer',
        method: 'GET',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notify('Errore', { type: 'error' });
      return;
    }

    const data = res.data; // or res.blob() if using blob responses

    const url = window.URL.createObjectURL(
      new Blob([data], {
        type: res.headers['content-type'],
      })
    );
    const actualFileName = getFileNameFromContentDisposition(
      res.headers['content-disposition']
    );

    // uses the download attribute on a temporary anchor to trigger the browser
    // download behavior. if you need wider compatibility, you can replace this
    // part with a library such as filesaver.js
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', actualFileName);
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) link.parentNode.removeChild(link);
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Link
      href="#"
      download={get(record, title)}
      onClick={(e) => {
        e.preventDefault();
        if (!loading) handleClick();
      }}
    >
      <>{get(record, title)}</>
    </Link>
  );
};
