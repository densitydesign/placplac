import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  InputAdornment,
  Typography,
  Tabs,
  Tab,
  styled,
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
  FilterForm,
  SearchInput,
} from 'react-admin';
import ListIcon from '@mui/icons-material/AttachFile';
import { useCallback, useState } from 'react';
import { MediaDatagrid } from './components/MediaDatagrid';
import { MAX_FILE_SIZE } from '../../constants';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AddMediaForm } from './components/AddMediaForm';
import { useProjectContext } from '../../contexts/project-context';
import axios from 'axios';
import { client, CustomDataProvider } from '../../dataProvider';
import AppsIcon from '@mui/icons-material/Apps';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
export function isExternalLink(url: string) {
  const tmp = document.createElement('a');
  tmp.href = url;
  return tmp.host !== window.location.host;
}
function a11yProps(index: number) {
  return {
    id: `media-tab-${index}`,
    'aria-controls': `media-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export interface SelectFileProps extends SelectInputProps {
  source?: string;
  choices?: object[];
  fileSource: string;
  titleSource: string;
  record?: RaRecord;

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
  const dataProvider = useDataProvider<CustomDataProvider>();
  const validate_image = async (value: string | null) => {
    console.log(value);
    if (value && value !== '') {
      if (isExternalLink(value)) {
        return 'Invalid link: select an uploaded file';
      }
    }
  };
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
    validate: validate,
    //   validate && Array.isArray(validate)
    //     ? [...validate, validate_image]
    //     : validate
    //     ? [validate, validate_image]
    //     : validate_image,
    ...rest,
  });
  const { error, invalid, isTouched } = fieldState;
  const { project } = useProjectContext();
  if (!project) {
    throw new Error(`Specify project`);
  }
  if (!type) {
    throw new Error(`Specify media type`);
  }
  const [selectedTab, setSelectedtab] = useState(0);

  const handleChangeSelectedTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSelectedtab(newValue);
  };

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
        <DialogContent style={{ padding: 0 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeSelectedTab}
            aria-label="media gallery tabs"
          >
            <Tab label="Select media" icon={<AppsIcon />} {...a11yProps(0)} />
            <Tab
              label="Upload new media"
              icon={<AddIcon />}
              {...a11yProps(1)}
            />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <ListBase
              resource="project-media"
              disableSyncWithLocation
              perPage={10}
              filterDefaultValues={{ type, project }}
              sort={{ field: 'id', order: 'DESC' }}
            >
              <FilterForm
                filters={[
                  <SearchInput
                    source="file"
                    placeholder="Search for file name"
                    alwaysOn
                    style={{ marginBottom: '20px' }}
                  />,
                ]}
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
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <AddMediaForm project={project} type={type} />
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
};
