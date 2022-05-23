import { Card, Typography, MenuItem, IconButton, Menu } from '@mui/material';
import React from 'react';
import {
  Datagrid,
  TextField,
  DateField,
  SelectField,
  FunctionField,
  EditButton,
  List,
  useRecordContext,
} from 'react-admin';
import MenuIcon from '@mui/icons-material/Menu';
import { DownloadButton } from '../../components/DownloadButton';
import { PreviewButton } from '../../components/PreviewButton';
import { ExportButton } from '../../components/ExportButton';
import { CloneButton } from '../../components/CloneButton';
import { Project, ProjectStatus } from '../../../types';

export const RowActionsButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const record = useRecordContext<Project>();
  return (
    <>
      <IconButton
        id={`${record.id}-button`}
        aria-controls={open ? `${record.id}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        title="Actions"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id={`${record.id}-menu`}
        aria-labelledby={`${record.id}-button`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>
          <PreviewButton project={record.id} />
        </MenuItem>
        <MenuItem>
          <ExportButton projectId={record.id} />
        </MenuItem>
        <MenuItem>
          <CloneButton project={record.id} />
        </MenuItem>
        {record.status === ProjectStatus.PUBLISHED && (
          <MenuItem>
            <DownloadButton project={record} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
