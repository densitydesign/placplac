import * as React from "react";
import { Box, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ListToolbarProps } from "react-admin";

const useStyles = makeStyles(
  (theme) => ({
    toolbar: {
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingRight: 0,
      [theme.breakpoints.up("xs")]: {
        paddingLeft: 0,
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
      },
    },
    actions: {
      paddingTop: 0,
      minHeight: 0,
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
      },
    },
  }),
  { name: "RaListToolbar" }
);

const CustomListToolbar = (
  props: ListToolbarProps & { breadcrumbs: React.ReactNode }
) => {
  const {
    classes: classesOverride,
    filters,
    actions,
    breadcrumbs,
    ...rest
  } = props;
  const classes = useStyles(props);

  return Array.isArray(filters) ? (
    <Toolbar className={classes.toolbar}>
      <Box pb={"8px"}>{breadcrumbs}</Box>

      <span />
      {actions &&
        React.cloneElement(actions, {
          ...rest,
          className: classes.actions,
          ...actions.props,
        })}
    </Toolbar>
  ) : (
    <Toolbar className={classes.toolbar}>
      <Box pb={"8px"}>{breadcrumbs}</Box>

      <span />
      {actions &&
        React.cloneElement(actions, {
          ...rest,
          className: classes.actions,
          filters,
          ...actions.props,
        })}
    </Toolbar>
  );
};

export default React.memo(CustomListToolbar);
