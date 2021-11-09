import * as React from "react";
import { useField } from "react-final-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useChoices } from "ra-core";

const RadioButtonInputItem = ({
  choice,
  optionText,
  optionValue,
  source,
  onChange,
}: any) => {
  const { getChoiceText, getChoiceValue } = useChoices({
    optionText,
    optionValue,
    translateChoice: false,
  });
  const label = getChoiceText(choice);
  const value = getChoiceValue(choice);
  const {
    input: { type, ...inputProps },
  } = useField(source, {
    type: "radio",
    value,
  });

  const nodeId = `${source}_${value}`;

  return (
    <FormControlLabel
      label={label}
      htmlFor={nodeId}
      control={
        <Radio
          id={nodeId}
          color="primary"
          style={{ backgroundColor: "white" }}
          {...inputProps}
          onChange={(_, isActive) => isActive && onChange(value)}
        />
      }
    />
  );
};

export default RadioButtonInputItem;
