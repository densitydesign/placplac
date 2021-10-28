import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import { ReduxState } from "ra-core";
import { useSelector } from "react-redux";
import { AppBar, LayoutProps, Menu, Notification, Sidebar } from "react-admin";
import ErrorBoundary from "./ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    height: "100vh",
    width: "100%",
  },

  content: {
    flex: "1 auto",
    overflow: "hidden",
    paddingTop: "58px",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      paddingTop: "50px",
    },
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: "100%",
    background: theme.palette.background.default,
  },
}));

export const Layout = ({
  theme: themeOverride,
  ...props
}: LayoutProps): JSX.Element => {
  const themeProp = useRef(themeOverride);
  const [theme, setTheme] = useState(() => createMuiTheme(themeOverride));
  const {
    appBar: DefaultAppBar = AppBar,
    children,
    className,
    dashboard,
    logout,
    menu: DefaultMenu = Menu,
    notification: DefaultNotification = Notification,
    sidebar: DefaultSidebar = Sidebar,
  } = props;
  const classes = useStyles();
  useEffect(() => {
    if (themeProp.current !== themeOverride) {
      themeProp.current = themeOverride;
      setTheme(createMuiTheme(themeOverride));
    }
  }, [themeOverride, themeProp, theme, setTheme]);
  const open = useSelector<ReduxState, boolean>(
    (state) => state.admin.ui.sidebarOpen
  );
  return (
    <ThemeProvider theme={theme}>
      <div className={classnames("layout", classes.root, className)}>
        <DefaultAppBar position="fixed" open={open} logout={logout} />

        <main className={classes.content}>
          <DefaultSidebar classes={{}}>
            <DefaultMenu hasDashboard={!!dashboard} />
          </DefaultSidebar>
          <div style={{ display: "flex", flex: "1 auto", overflow: "hidden" }}>
            <div style={{ flex: "1 auto", height: "100%", overflow: "auto" }}>
              <Container maxWidth={false} className={classes.container}>
                <ErrorBoundary>{children}</ErrorBoundary>
              </Container>
            </div>
          </div>
        </main>
        <DefaultNotification />
      </div>
    </ThemeProvider>
  );
};
