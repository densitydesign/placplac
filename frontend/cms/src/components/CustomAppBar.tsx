import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { AppBar, AppBarProps } from "react-admin";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
});
export const CustomAppBar = (props: AppBarProps) => {
  const classes = useStyles();
  return (
    <AppBar color="primary" {...props}>
      <Typography variant="h6" color="inherit" className={classes.title}>
        ALGOCOUNT
      </Typography>

      <span className={classes.spacer} />
    </AppBar>
  );
};
