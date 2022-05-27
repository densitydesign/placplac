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
  SidebarToggleButtonProps,
  UserMenu,
  useSidebarState,
} from 'react-admin';
import { SidebarToggleButton } from './Sidebar/components/SidebarToggleButton';
const PREFIX = 'RaAppBar';

const classes = {
  toolbar: `${PREFIX}-toolbar`,
  menuButton: `${PREFIX}-menuButton`,
  menuButtonIconClosed: `${PREFIX}-menuButtonIconClosed`,
  menuButtonIconOpen: `${PREFIX}-menuButtonIconOpen`,
  title: `${PREFIX}-title`,
};

export const CustomAppBar = (props: AppBarProps) => {
  const {
    children,
    classes: classesOverride,
    className,
    color = 'primary',
    open,
    title,
    userMenu,
    container: Container = HideOnScroll,
    ...rest
  } = props;
  return (
    <Container>
      <MuiAppBar className={className} color={color} {...rest}>
        <Toolbar disableGutters variant={'dense'} className={classes.toolbar}>
          <SidebarToggleButton className={classes.menuButton} />
          <Typography
            style={{
              flex: 1,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            PlacPlac
          </Typography>
          <LoadingIndicator />
          <UserMenu>
            <Logout />
          </UserMenu>
        </Toolbar>
      </MuiAppBar>
    </Container>
  );
};
