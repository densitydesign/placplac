import {
  DashboardMenuItem,
  Menu as RaMenu,
  MenuItemLink,
  MenuProps,
  usePermissions,
  useSidebarState,
} from 'react-admin';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {
  Box,
  MenuItem,
  Link,
  makeStyles,
  ListItemIcon,
  styled,
} from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { DOC_URL } from '../../../constants';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(5),
}));
const StyledMenu = styled(RaMenu)(({ theme }) => ({
  height: '100vh',
}));
export const Menu = (props: MenuProps) => {
  const { permissions } = usePermissions();

  const [open] = useSidebarState();

  return (
    <StyledMenu {...props}>
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
            sx={{
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
            }}
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
            <StyledListItemIcon color="inherit">
              <FindInPageIcon />
            </StyledListItemIcon>
          </MenuItem>
        )}
      </Box>
    </StyledMenu>
  );
};
