import { makeStyles } from "@material-ui/core";
import React from "react";
import {
  DeleteButton,
  SaveButton,
  Toolbar,
  ToolbarProps,
  usePermissions,
} from "react-admin";
import { PERMISSIONS } from "../constants";

const valueOrDefault = (value: any, defaultValue: any) =>
  typeof value === "undefined" ? defaultValue : value;
const useStyles = makeStyles(
  (theme) => ({
    toolbar: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
    },
    desktopToolbar: {
      marginTop: theme.spacing(2),
    },
    mobileToolbar: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "16px",
      width: "100%",
      boxSizing: "border-box",
      flexShrink: 0,
      zIndex: 2,
    },
    defaultToolbar: {
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
    },
    spacer: {
      [theme.breakpoints.down("xs")]: {
        height: "5em",
      },
    },
  }),
  { name: "RaToolbar" }
);
export const CustomToolbar = (props: ToolbarProps) => {
  const { permissions } = usePermissions();
  const resource = props.resource!;
  const disabled = !valueOrDefault(
    props.alwaysEnableSaveButton,
    !props.pristine && !props.validating
  );
  const classes = useStyles(props);

  return (
    <Toolbar className={classes.defaultToolbar} {...props}>
      {permissions && permissions.includes(PERMISSIONS[resource].edit) && (
        <SaveButton
          handleSubmitWithRedirect={
            props.handleSubmitWithRedirect || props.handleSubmit
          }
          disabled={disabled}
          invalid={props.invalid}
          redirect={props.redirect}
          saving={props.saving || props.validating}
          submitOnEnter={props.submitOnEnter}
        />
      )}
      {permissions && permissions.includes(PERMISSIONS[resource].edit) && (
        <DeleteButton
          basePath={props.basePath}
          record={props.record}
          resource={resource}
          undoable={props.undoable}
          mutationMode={props.mutationMode}
        />
      )}
    </Toolbar>
  );
};
