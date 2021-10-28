import { makeStyles } from "@material-ui/core";
import React from "react";
import { Sidebar, SidebarProps } from "react-admin";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
    [theme.breakpoints.up("sm")]: {
      background: "#fff",
    },
  },
  drawerPaper: {
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    borderTop: "none",
  },
  //   root: { top: "50px", position: "fixed", height: "calc(100% - 50px)" },
}));
export const CustomSidebar = (props: Omit<SidebarProps, "classes">) => {
  const classes = useStyles();
  return <Sidebar {...props} classes={classes} />;
};
