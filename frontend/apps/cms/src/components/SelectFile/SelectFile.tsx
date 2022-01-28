import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import {
  FieldTitle,
  InputHelperText,
  Record,
  ResettableTextField,
  SelectInputProps,
  useInput,
  sanitizeInputRestProps,
  ListBase,
  Pagination,
  FormWithRedirect,
  ImageInput,
  ImageField,
  TextInput,
  SaveButton,
  required,
  useMutation,
  useNotify,
  FileInput,
  FileField,
  Button,
  ListToolbar,
  FilterButton,
  TopToolbar,
} from 'react-admin';
import ListIcon from '@material-ui/icons/AttachFile';
import { useCallback, useState } from 'react';
import { MediaDatagrid } from './components/MediaDatagrid';

export interface SelectFileProps extends SelectInputProps {
  source?: string;
  choices?: object[];
  fileSource: string;
  titleSource: string;
  record?: Record;
  project: number;
  handleChange: () => void;
  type: 'image' | 'file';
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
  allowEmpty,
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
    input,
    isRequired,
    meta: { touched, error, submitError },
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
  if (!type) {
    throw new Error(`Specify media type`);
  }
  if (!project) {
    throw new Error(`Specify project`);
  }
  const [mutate] = useMutation();
  const notify = useNotify();
  const [version, setVersion] = useState(0);
  const handleChangedBackend = useCallback(
    () => setVersion(version + 1),
    [version]
  );

  return (
    <>
      <ResettableTextField
        id={id}
        {...input}
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
        error={!!(touched && (error || submitError))}
        helperText={
          <InputHelperText
            touched={!!touched}
            error={error || submitError}
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
          <FormWithRedirect
            resource="project-media"
            initialValues={{ project, type }}
            save={({ description_file, ...values }) => {
              mutate(
                {
                  type: 'createMultipart',
                  resource: 'project-media',
                  payload: {
                    data: { ...values, description: description_file },
                  },
                },
                {
                  onSuccess: (data) => {
                    handleChangedBackend();
                  },
                  onFailure: ({ error }) => {
                    notify(error.message, 'error');
                  },
                }
              );
            }}
            render={({ handleSubmitWithRedirect, pristine, saving }) => (
              <>
                <Typography variant="h5">Add new file</Typography>
                {type === 'image' ? (
                  <ImageInput
                    helperText={false}
                    validate={required()}
                    source="file"
                    label={''}
                    accept="image/*"
                  >
                    <ImageField source="src" title="title" />
                  </ImageInput>
                ) : (
                  <FileInput
                    helperText={false}
                    validate={required()}
                    source="file"
                    label={''}
                  >
                    <FileField source="src" title="title" />
                  </FileInput>
                )}
                <TextInput fullWidth source="description_file" />
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <SaveButton
                      handleSubmitWithRedirect={handleSubmitWithRedirect}
                      saving={saving}
                      disabled={loading}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Typography variant="h5">Or choose a file</Typography>
          <Box mt={'8px'}>
            <ListBase
              key={version}
              resource="project-media"
              syncWithLocation={false}
              basePath="/project-media"
              perPage={10}
              filterDefaultValues={{ type, project }}
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
                key={version}
                value={input.value}
                onChange={(value) => {
                  input.onChange(value);
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
