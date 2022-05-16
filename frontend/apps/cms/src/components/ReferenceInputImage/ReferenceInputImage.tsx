import { Identifier } from 'react-admin';
import { SelectFile } from '../SelectFile';

interface ReferenceInputImageProps {
  source: string;
  project: Identifier;
  label?: string;
  validate?: any;
  fullWidth?: boolean;
}
export const ReferenceInputImage = (props: ReferenceInputImageProps) => {
  const { source, project, label, validate, fullWidth } = props;

  return (
    <SelectFile
      type="image"
      defaultValue=""
      label={label ? label : 'Image'}
      source={source}
      project={project}
      fullWidth={fullWidth}
      validate={validate}
      helperText="Paste the url of the image or click the right button to choose a file from the library"
    />
  );
};
