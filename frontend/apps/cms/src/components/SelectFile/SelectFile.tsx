import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  FieldTitle,
  InputHelperText,
  ResettableTextField,
  SelectInputProps,
  useInput,
  sanitizeInputRestProps,
  ListBase,
  Pagination,
  Form,
  ImageInput,
  ImageField,
  TextInput,
  SaveButton,
  required,
  useNotify,
  FileInput,
  FileField,
  Button,
  ListToolbar,
  FilterButton,
  TopToolbar,
  RecordContextProvider,
  RaRecord,
  useDataProvider,
} from 'react-admin';
import ListIcon from '@mui/icons-material/AttachFile';
import { useCallback, useState } from 'react';
import { MediaDatagrid } from './components/MediaDatagrid';
import { MAX_FILE_SIZE } from '../../constants';
import { FieldValues } from 'react-hook-form';
import { client, CustomDataProvider } from '../../dataProvider';
import { useMutation } from 'react-query';
import { AddMediaForm } from './components/AddMediaForm';

export interface SelectFileProps extends SelectInputProps {
  source?: string;
  choices?: object[];
  fileSource: string;
  titleSource: string;
  record?: RaRecord;
  project: number;
  handleChange: () => void;
  type: 'image' | 'file' | 'video';
}

export const SelectFile = ({
  choices,
  fileSource,
  titleSource,
  source,
  record,
  input: inputOverride,
  isRequired: isRequiredOverride,
  meta: metaOverride,
  id: idOverride,
  helperText,
  project,
  handleChange,

  classes: classesOverride,
  className,
  create,
  createLabel,
  createValue,
  disableValue,
  emptyText,
  emptyValue,
  format,
  label,
  loaded,
  loading,
  margin = 'dense',
  onBlur,
  onChange,
  onCreate,
  onFocus,
  options,
  optionText,
  optionValue,
  parse,
  resource,
  translateChoice,
  validate,
  children,
  basePath,
  pagination,
  refetch,
  setFilter,
  setPagination,
  setSort,
  type,
  ...rest
}: SelectFileProps & any) => {
  const [open, setOpen] = useState(false);
  const {
    id,
    field,
    isRequired,
    fieldState,
    formState: { isSubmitted },
  } = useInput({
    format,
    id: idOverride,
    input: inputOverride,
    meta: metaOverride,
    onBlur,
    onChange,
    onFocus,
    parse,
    resource,
    source,
    validate,
    ...rest,
  });
  const { error, invalid, isTouched } = fieldState;

  if (!type) {
    throw new Error(`Specify media type`);
  }
  if (!project) {
    throw new Error(`Specify project`);
  }

  return (
    <>
      <ResettableTextField
        id={id}
        {...field}
        label={
          label !== '' &&
          label !== false && (
            <FieldTitle
              label={label}
              source={source}
              resource={resource}
              isRequired={isRequired}
            />
          )
        }
        className={`${className}`}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                aria-label="Select media"
                title="Select media"
                onClick={() => setOpen(true)}
                style={{ marginRight: '15px' }}
              >
                <ListIcon />
              </Button>
            </InputAdornment>
          ),
        }}
        error={(isTouched || isSubmitted) && invalid}
        helperText={
          <InputHelperText
            touched={isTouched || isSubmitted}
            error={error?.message}
            helperText={helperText}
          />
        }
        margin={margin}
        {...options}
        {...sanitizeInputRestProps(rest)}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogContent>
          <AddMediaForm project={project} type={type} />

          <Typography variant="h5">Or choose a file</Typography>
          <Box mt={'8px'}>
            <ListBase
              resource="project-media"
              disableSyncWithLocation
              perPage={10}
              filterDefaultValues={{ type, project }}
              sort={{ field: 'id', order: 'DESC' }}
            >
              <ListToolbar
                filters={[
                  <TextInput
                    source="file"
                    label="File name"
                    placeholder="Search for file name"
                    alwaysOn
                    fullWidth
                  />,
                ]}
                actions={
                  <TopToolbar>
                    <FilterButton />
                  </TopToolbar>
                }
              />
              <MediaDatagrid
                type={type}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setOpen(false);
                }}
              />
              <Pagination />
            </ListBase>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
