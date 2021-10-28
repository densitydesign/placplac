import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { Button } from "react-admin";
import ContentSave from "@material-ui/icons/Save";
import classnames from "classnames";

const useStyles = makeStyles(
  (theme) => ({
    button: {
      position: "relative",
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    icon: {
      fontSize: 18,
    },
  }),
  { name: "RaSaveButton" }
);

export const FormSaveButton = ({
  submitting,
  pristine,
  handleSubmit,
}: {
  submitting: boolean;
  pristine: boolean;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant={"contained"}
      label="ra.action.save"
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
    </Button>
  );
};
