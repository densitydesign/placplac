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
  useTranslate,
} from 'react-admin';
const PREFIX = 'RaSidebarToggleButton';

const classes = {
  menuButtonIconClosed: `${PREFIX}-menuButtonIconClosed`,
  menuButtonIconOpen: `${PREFIX}-menuButtonIconOpen`,
};

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .${classes.menuButtonIconClosed}`]: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(0deg)',
  },

  [`& .${classes.menuButtonIconOpen}`]: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(360deg)',
  },
}));

export const SidebarToggleButton = (props: SidebarToggleButtonProps) => {
  const translate = useTranslate();

  const { className } = props;
  const [open, setOpen] = useSidebarState();

  return (
    <StyledTooltip
      title={translate(open ? 'ra.action.close_menu' : 'ra.action.open_menu', {
        _: 'Open/Close menu',
      })}
      enterDelay={500}
    >
      <IconButton
        color="inherit"
        onClick={() => setOpen(!open)}
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
    </StyledTooltip>
  );
};
