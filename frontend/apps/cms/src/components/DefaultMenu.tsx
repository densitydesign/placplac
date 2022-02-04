import {
  DashboardMenuItem,
  Menu,
  MenuItemLink,
  MenuProps,
  ReduxState,
  usePermissions,
} from 'react-admin';
import GroupIcon from '@material-ui/icons/Group';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import {
  Box,
  MenuItem,
  Link,
  makeStyles,
  ListItemIcon,
} from '@material-ui/core';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { useSelector } from 'react-redux';
import { DOC_URL } from '../constants';

const useStylesContainer = makeStyles(() => {
  return { main: { height: '100vh' } };
});

const useStyles = makeStyles((theme) => ({
  button: {
    flex: '1',
    border: '2px solid black',
    borderRadius: '2em',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      background: 'black',
      textDecoration: 'none',
    },
  },
  icon: {
    minWidth: theme.spacing(5),
  },
}));
export const DefaultMenu = (props: MenuProps) => {
  const { permissions } = usePermissions();
  const classes = useStylesContainer();
  const styles = useStyles();
  const open = useSelector<ReduxState, boolean>(
    (state) => state.admin.ui.sidebarOpen
  );
  return (
    <Menu {...props} classes={classes}>
      <MenuItemLink
        to="/projects"
        primaryText="Projects"
        leftIcon={<CollectionsBookmarkIcon />}
      />

      {permissions && permissions.includes('authentication.change_user') && (
        <MenuItemLink
          to="/users"
          primaryText="Users"
          leftIcon={<GroupIcon />}
        />
      )}
      <Box
        flex="1 auto"
        display={'flex'}
        padding={open ? '6px 16px' : 0}
        alignItems="center"
      >
        {open ? (
          <MenuItem
            component={Link}
            className={styles.button}
            href={`${DOC_URL}`}
            target={'_blank'}
            title="go to documentation"
          >
            <span>Go to documentation</span>
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            href={`${DOC_URL}`}
            target={'_blank'}
            title="go to documentation"
          >
            <ListItemIcon className={styles.icon} color="inherit">
              <FindInPageIcon />
            </ListItemIcon>
          </MenuItem>
        )}
      </Box>
    </Menu>
  );
};
