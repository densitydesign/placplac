import { CircularProgress, makeStyles } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Button } from 'react-admin';
import ContentSave from '@mui/icons-material/Save';
import classnames from 'classnames';

const PREFIX = 'RaSaveButton';

const classes = {
  button: `${PREFIX}-button`,
  leftIcon: `${PREFIX}-leftIcon`,
  icon: `${PREFIX}-icon`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.button}`]: {
    position: 'relative',
  },

  [`& .${classes.leftIcon}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.icon}`]: {
    fontSize: 18,
  },
}));

export const FormSaveButton = ({
  submitting,
  pristine,
  handleSubmit,
  label,
}: {
  submitting: boolean;
  pristine: boolean;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label?: string;
}) => {
  return (
    <StyledButton
      className={classes.button}
      variant={'contained'}
      label={label ? label : 'ra.action.save'}
      onClick={handleSubmit}
      disabled={submitting || pristine}
    >
      {submitting ? (
        <CircularProgress
          className={classnames(classes.leftIcon, classes.icon)}
          size={18}
          thickness={2}
        />
      ) : (
        <ContentSave className={classes.leftIcon} />
      )}
    </StyledButton>
  );
};
