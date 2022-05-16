import * as React from 'react';
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
import {
  AppBarProps,
  HideOnScroll,
  LoadingIndicator,
  Logout,
  SidebarToggleButton,
  SidebarToggleButtonProps,
  UserMenu,
  useSidebarState,
} from 'react-admin';
const PREFIX = 'RaAppBar';

const classes = {
  toolbar: `${PREFIX}-toolbar`,
  menuButton: `${PREFIX}-menuButton`,
  menuButtonIconClosed: `${PREFIX}-menuButtonIconClosed`,
  menuButtonIconOpen: `${PREFIX}-menuButtonIconOpen`,
  title: `${PREFIX}-title`,
};

const AppBar = (props: AppBarProps): JSX.Element => {
  const {
    children,
    classes: classesOverride,
    className,
    color = 'secondary',
    open,
    title,
    userMenu,
    container: Container = HideOnScroll,
    ...rest
  } = props;

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
          <SidebarToggleButton className={classes.menuButton} />
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
          <UserMenu>
            <Logout />
          </UserMenu>
        </Toolbar>
      </MuiAppBar>
    </Container>
  );
};

AppBar.defaultProps = {
  userMenu: <UserMenu />,
  container: HideOnScroll,
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [`& .${classes.toolbar}`]: {
    paddingRight: 24,
  },

  [`& .${classes.menuButton}`]: {
    marginLeft: '0.2em',
    marginRight: '0.2em',
  },

  [`& .${classes.menuButtonIconClosed}`]: {},
  [`& .${classes.menuButtonIconOpen}`]: {},

  [`& .${classes.title}`]: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export const CustomAppBar = (props: AppBarProps) => {
  return (
    <StyledAppBar color="primary" {...props}>
      <Typography variant="h6" color="inherit" className={classes.title}>
        PlacPlac
      </Typography>
      {/* <span className={classes.spacer} /> */}
    </StyledAppBar>
  );
};
