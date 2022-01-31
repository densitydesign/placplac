import * as React from 'react';
import { Children, cloneElement, memo } from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  Typography,
  useMediaQuery,
  Theme,
  makeStyles,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { ComponentPropType, useTranslate } from 'ra-core';
import {
  AppBarProps,
  HideOnScroll,
  LoadingIndicator,
  SidebarToggleButtonProps,
  UserMenu,
  useToggleSidebar,
} from 'react-admin';

const SidebarToggleButton = (props: SidebarToggleButtonProps) => {
  const translate = useTranslate();
  const classes = useStylesButton(props);
  const { className } = props;
  const [open, toggleSidebar] = useToggleSidebar();

  return (
    <Tooltip
      title={translate(open ? 'ra.action.close_menu' : 'ra.action.open_menu', {
        _: 'Open/Close menu',
      })}
      enterDelay={500}
    >
      <IconButton
        color="inherit"
        onClick={() => toggleSidebar()}
        className={className}
      >
        <img
          className={
            open ? classes.menuButtonIconOpen : classes.menuButtonIconClosed
          }
          alt="PlacPlac"
          src="/assets/negative-placplac.png"
          width={'18px'}
        />
      </IconButton>
    </Tooltip>
  );
};

const useStylesButton = makeStyles(
  (theme) => ({
    menuButtonIconClosed: {
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      transform: 'rotate(0deg)',
    },
    menuButtonIconOpen: {
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      transform: 'rotate(360deg)',
    },
  }),
  { name: 'RaSidebarToggleButton' }
);

const useStylesAppbar = makeStyles(
  (theme) => ({
    toolbar: {
      paddingRight: 24,
    },
    menuButton: {
      marginLeft: '0.2em',
      marginRight: '0.2em',
    },
    menuButtonIconClosed: {},
    menuButtonIconOpen: {},
    title: {
      flex: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  { name: 'RaAppBar' }
);

const AppBar = (props: AppBarProps): JSX.Element => {
  const {
    children,
    classes: classesOverride,
    className,
    color = 'secondary',
    logout,
    open,
    title,
    userMenu,
    container: Container = HideOnScroll,
    ...rest
  } = props;
  const classes = useStylesAppbar(props);
  const sidebarToggleButtonClasses = {
    menuButtonIconClosed: classes.menuButtonIconClosed,
    menuButtonIconOpen: classes.menuButtonIconOpen,
  };
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('xs')
  );

  return (
    <Container>
      <MuiAppBar className={className} color={color} {...rest}>
        <Toolbar
          disableGutters
          variant={isXSmall ? 'regular' : 'dense'}
          className={classes.toolbar}
        >
          <SidebarToggleButton
            className={classes.menuButton}
            classes={sidebarToggleButtonClasses}
          />
          {Children.count(children) === 0 ? (
            <Typography
              variant="h6"
              color="inherit"
              className={classes.title}
              id="react-admin-title"
            />
          ) : (
            children
          )}
          <LoadingIndicator />
          {typeof userMenu === 'boolean' ? (
            userMenu === true ? (
              <UserMenu logout={logout} />
            ) : null
          ) : (
            cloneElement(userMenu!, { logout })
          )}
        </Toolbar>
      </MuiAppBar>
    </Container>
  );
};

AppBar.defaultProps = {
  userMenu: <UserMenu />,
  container: HideOnScroll,
};

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
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
        PlacPlac
      </Typography>

      <span className={classes.spacer} />
    </AppBar>
  );
};
