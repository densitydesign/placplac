import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CloudDownload from "@material-ui/icons/CloudDownload";
import { Button, useNotify, Record, useLoading } from "react-admin";
import { clientNoJson } from "../dataProvider";
import { url } from "../constants";
import { CircularProgress } from "@material-ui/core";

interface DownloadButtonProps {
  project?: Record;
}

export const DownloadButton = (props: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const mainIsLoading = useLoading();
  const notify = useNotify();
  
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setLoading(true);
    clientNoJson(`${url}/projects/${props.project?.id}/export/`, {
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const a = document.createElement("a");
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
        notify("ra.notification.http_error", "error");
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Prompt
        when={loading}
        message="You are downloading your project, are you sure you want to leave?"
      />
      <Button
        onClick={onClick}
        label="Download"
        title="Download"
        disabled={loading || mainIsLoading}
      >
        {loading ? (
          <CircularProgress size={18} thickness={2} />
        ) : (
          <CloudDownload />
        )}
      </Button>
    </>
  );
};
