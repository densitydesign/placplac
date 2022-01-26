import { Experiment } from '@algocount/shared/types';
import React from 'react';
import { DownloadButton } from './DownloadButton/DownloadButton';
import JSZip from 'jszip';
import { urlToPromise } from '../../utils';

interface DownloadAdditionalMaterialsButton {
  experiment: Experiment;
}
export const DownloadAdditionalMaterialsButton = (
  props: DownloadAdditionalMaterialsButton
) => {
  const { experiment } = props;
  const onClick = () => {
    const files = experiment.additional_material
      ? experiment.additional_material
      : [];

    if (files.length > 0) {
      const zip = new JSZip();
      files.forEach((file) => {
        zip.file(file.name, urlToPromise(file.file) as any, { binary: true });
      });

      zip.generateAsync({ type: 'blob' }).then((content) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(content);
        a.href = url;
        a.download = `other-material-${experiment.title}.zip`;
        document.body.append(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
    }
  };
  return <DownloadButton onClick={onClick} label={'Other materials'} />;
};
