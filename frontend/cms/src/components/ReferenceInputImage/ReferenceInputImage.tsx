import { makeStyles } from "@material-ui/styles";
import { required } from "ra-core";
import { ReferenceInput } from "ra-ui-materialui";
import React, { useCallback, useState } from "react";
import { SelectImage } from "./components/SelectImage";

const useStyles = makeStyles(() => ({
  root: { display: "flex", flexDirection: "column" },
}));

interface ReferenceInputImageProps {
  source: string;
  project: number;
  label?: string;
}
export const ReferenceInputImage = (props: ReferenceInputImageProps) => {
  const { source, project, label } = props;
  const classes = useStyles();
  const [version, setVersion] = useState(0);

  const handleChange = useCallback(() => setVersion(version + 1), [version]);

  return (
    <div className={classes.root}>
      <ReferenceInput
        key={version}
        label={label ? label : "Image"}
        source={source}
        reference="media"
        filter={{ project, type: "image" }}
        validate={required()}
      >
        <SelectImage
          project={project}
          fileSource="file"
          titleSource="description"
          handleChange={handleChange}
        />
      </ReferenceInput>
    </div>
  );
};
