import { Experiment } from '@algocount/shared/types';
import React from 'react';
import { DownloadButton } from './DownloadButton/DownloadButton';
import JSZip from 'jszip';
import { getRealPath, urlToPromise } from '../../utils';

interface DownloadExperimentMaterialsButtonProps {
  experiment: Experiment;
}
export const DownloadExperimentMaterialsButton = (
  props: DownloadExperimentMaterialsButtonProps
) => {
  const { experiment } = props;
  const onClick = () => {
    const files = experiment.steps.reduce((previous, step) => {
      if (step.downloads) previous.push(...step.downloads);
      return previous;
    }, [] as any[]);

    if (files.length > 0) {
      const zip = new JSZip();
      files.forEach((file) => {
        zip.file(file.name, urlToPromise(getRealPath(file.file)) as any, { binary: true });
      });

      zip.generateAsync({ type: 'blob' }).then((content) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(content);
        a.href = url;
        a.download = `material-${experiment.title}.zip`;
        document.body.append(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
    }
  };
  return <DownloadButton onClick={onClick} label={'Experiment materials'} />;
};
