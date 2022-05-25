import * as React from 'react';
import { MouseEventHandler, ReactElement, useCallback } from 'react';
import { UseMutationOptions } from 'react-query';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import ContentSave from '@mui/icons-material/Save';
import { useFormContext, useFormState } from 'react-hook-form';
import {
  CreateParams,
  MutationMode,
  RaRecord,
  TransformData,
  UpdateParams,
  useSaveContext,
  useTranslate,
  warning,
  setSubmissionErrors,
} from 'ra-core';

export const FormSaveButton = <RecordType extends RaRecord = any>(
  props: SaveButtonProps<RecordType>
) => {
  const {
    color = 'primary',
    icon = defaultIcon,
    invalid,
    label = 'ra.action.save',
    onClick,
    mutationOptions,
    saving,
    disabled: disabledProp,
    type = 'submit',
    transform,
    variant = 'contained',
    ...rest
  } = props;
  const translate = useTranslate();
  const form = useFormContext();
  const saveContext = useSaveContext();
  const { isValidating } = useFormState();
  // Use form isDirty, isValidating and form context saving to enable or disable the save button
  // if alwaysEnable is undefined
  const disabled = disabledProp || isValidating || saveContext?.saving;

  warning(
    type === 'submit' &&
      ((mutationOptions &&
        (mutationOptions.onSuccess || mutationOptions.onError)) ||
        transform),
    'Cannot use <SaveButton mutationOptions> props on a button of type "submit". To override the default mutation options on a particular save button, set the <SaveButton type="button"> prop, or set mutationOptions in the main view component (<Create> or <Edit>).'
  );

  const handleSubmit = useCallback(
    async (values) => {
      let errors;
      if (saveContext?.save) {
        errors = await saveContext.save(values, {
          ...mutationOptions,
          transform,
        });
      }
      if (errors != null) {
        setSubmissionErrors(errors, form.setError);
      }
    },
    [form.setError, saveContext, mutationOptions, transform]
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (onClick) {
        onClick(event);
      }
      if (event.defaultPrevented) {
        return;
      }
      if (type === 'button') {
        // this button doesn't submit the form, so it doesn't trigger useIsFormInvalid in <FormContent>
        // therefore we need to check for errors manually
        event.stopPropagation();
        await form.handleSubmit(handleSubmit)(event);
      }
    },
    [onClick, type, form, handleSubmit]
  );

  const displayedLabel = label && translate(label, { _: label });
  const finalSaving =
    typeof saving !== 'undefined' ? saving : saveContext?.saving;

  return (
    <StyledButton
      variant={variant}
      type={type}
      color={color}
      aria-label={displayedLabel}
      disabled={disabled}
      onClick={handleClick}
      // TODO: find a way to display the loading state (LoadingButton from mui Lab?)
      {...sanitizeButtonRestProps(rest)}
    >
      {finalSaving ? <CircularProgress size={18} thickness={2} /> : icon}
      {displayedLabel}
    </StyledButton>
  );
};

const defaultIcon = <ContentSave />;

interface Props<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
> {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  invalid?: boolean;
  label?: string;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    CreateParams<RecordType> | UpdateParams<RecordType>
  >;
  transform?: TransformData;
  saving?: boolean;
  variant?: string;
  // May be injected by Toolbar - sanitized in Button
  record?: RaRecord;
  resource?: string;
  mutationMode?: MutationMode;
}

export type SaveButtonProps<RecordType extends RaRecord = any> =
  Props<RecordType> &
    ButtonProps & {
      alwaysEnable?: boolean;
    };

const PREFIX = 'RaSaveButton';

const StyledButton = styled(Button, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  [`& .MuiSvgIcon-root, & .MuiIcon-root, & .MuiCircularProgress-root`]: {
    marginRight: theme.spacing(1),
  },
  [`& .MuiSvgIcon-root, & .MuiIcon-root`]: {
    fontSize: 18,
  },
}));

const sanitizeButtonRestProps = ({
  // The next props are injected by Toolbar
  invalid,
  pristine,
  record,
  redirect,
  resource,
  mutationMode,
  hasCreate,
  ...rest
}: any) => rest;
