import { PossibleColumns } from '@algocount/shared/types';
import { Grid } from '@mui/material';
import {
  SelectInput,
  required,
  BooleanInput,
  RecordContextProvider,
  SaveButton,
  useAugmentedForm,
} from 'react-admin';
import { FormProvider } from 'react-hook-form';
interface AddRowButtonProps {
  onSubmit: (items: any) => void;
  canDivided: boolean;
}
export const AddRowButton = (props: AddRowButtonProps) => {
  const choices = [
    { id: 1, name: 'One column' },
    { id: 2, name: 'Two columns' },
    { id: 3, name: 'Three columns' },
    { id: 4, name: '4 columns' },
  ];

  const { form, formHandleSubmit } = useAugmentedForm({
    record: {},
    onSubmit: props.onSubmit,
    defaultValues: {},
  });
  return (
    <RecordContextProvider
      value={{ cols: choices[0].id, divided: props.canDivided }}
    >
      <FormProvider {...form}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <SelectInput
              variant="outlined"
              helperText={false}
              validate={[required()]}
              source="cols"
              label="Columns number"
              choices={choices}
            />
          </Grid>
          {props.canDivided && (
            <Grid item>
              <BooleanInput
                variant="outlined"
                helperText={false}
                validate={required()}
                source="divided"
                defaultValue={false}
                label="Splitted row"
              />
            </Grid>
          )}
          <Grid item>
            <SaveButton
              label="Add row"
              type="button"
              alwaysEnable
              onClick={formHandleSubmit}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </RecordContextProvider>
  );
};
