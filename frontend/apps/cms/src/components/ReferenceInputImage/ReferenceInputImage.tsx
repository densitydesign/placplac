import { Identifier } from 'react-admin';
import { useProjectContext } from '../../contexts/project-context';
import { SelectFile } from '../SelectFile';

interface ReferenceInputImageProps {
  source: string;
  label?: string;
  validate?: any;
  fullWidth?: boolean;
}
export const ReferenceInputImage = (props: ReferenceInputImageProps) => {
  const { source, label, validate, fullWidth } = props;

  return (
    <SelectFile
      type="image"
      defaultValue=""
      label={label ? label : 'Image'}
      source={source}
      fullWidth={fullWidth}
      validate={validate}
      helperText="Click the right button to choose a file from the library"
    />
  );
};
