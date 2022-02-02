import React from 'react';
import { getRealPath } from '../../../utils';
import styles from './DownloadButton.module.css';

interface DownloadButtonPros {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const DownloadButton = (props: DownloadButtonPros) => {
  const { label, onClick } = props;

  return (
    <button onClick={onClick} className={styles.button}>
      <img width="15px" src={getRealPath("/assets/download-icon.png")} />
      <span>{label}</span>
    </button>
  );
};
