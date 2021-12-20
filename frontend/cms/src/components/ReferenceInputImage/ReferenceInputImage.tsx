import { SelectFile } from "../SelectFile";

interface ReferenceInputImageProps {
  source: string;
  project: number;
  label?: string;
}
export const ReferenceInputImage = (props: ReferenceInputImageProps) => {
  const { source, project, label } = props;

  return (
    <SelectFile
      type="image"
      label={label ? label : "Image"}
      source={source}
      project={project}
      fullWidth
    />
  );
};
