import { Box, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { TopToolbar } from "react-admin";
const useStyles = makeStyles((theme) => ({
  root: { justifyContent: "space-between", alignItems: "flex-end" },
}));

export const TopToolbarWithTitle = (props: {
  children?: React.ReactNode;
  className?: string;
  title: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <TopToolbar className={classNames(classes.root, props.className)}>
      <Box display="flex" flexDirection="column">
        {props.title}
      </Box>
      <div>{props.children}</div>
    </TopToolbar>
  );
};
