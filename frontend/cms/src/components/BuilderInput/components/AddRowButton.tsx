import { Grid } from "@material-ui/core";
import { SelectInput, required, Button } from "react-admin";
import { Form } from "react-final-form";
import { PossibleColumns } from "../types";
interface AddRowButtonProps {
  onSubmit: (items: any) => void;
  possibleColumns?: PossibleColumns;
}
export const AddRowButton = (props: AddRowButtonProps) => {
  const defualtChoices = [
    { id: 1, name: "One column" },
    { id: 2, name: "Two columns" },
    { id: 3, name: "Three columns" },
    { id: 4, name: "4 columns" },
  ];
  const choices = props.possibleColumns
    ? props.possibleColumns.map(
        (col) => defualtChoices.find((choice) => choice.id === col)!
      )
    : defualtChoices;
  return (
    <Form
      initialValues={{ cols: choices[0].id }}
      onSubmit={(values) => {
        props.onSubmit(values);
      }}
      render={({ handleSubmit }) => (
        <Grid container alignItems="center">
          <Grid item>
            <SelectInput
              variant="outlined"
              helperText={false}
              validate={required()}
              source="cols"
              label="Columns number"
              choices={choices}
            />
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit} label="Add row" />
          </Grid>
        </Grid>
      )}
    />
  );
};
