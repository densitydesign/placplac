import { styled } from '@mui/material/styles';
import React from 'react';
import { Sidebar as SidebarRa, SidebarProps } from 'react-admin';

const StyledSidebar = styled(SidebarRa)(({ theme }) => ({
  [`& .RaSidebar-fixed`]: {
    background: 'transparent',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    borderTop: 'none',
    [theme.breakpoints.up('sm')]: {
      background: '#fff',
    },
  },
}));

export const Sidebar = (props: Omit<SidebarProps, 'classes'>) => {
  return <StyledSidebar {...props} />;
};
