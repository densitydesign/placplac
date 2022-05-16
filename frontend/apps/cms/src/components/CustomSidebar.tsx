import { styled } from '@mui/material/styles';
import React from 'react';
import { Sidebar, SidebarProps } from 'react-admin';

const StyledSidebar = styled(Sidebar)(({ theme }) => ({
  [`& .RaSidebar-fixed`]: {
    background: 'transparent',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    borderTop: 'none',
    [theme.breakpoints.up('sm')]: {
      background: '#fff',
    },
  },
}));

export const CustomSidebar = (props: Omit<SidebarProps, 'classes'>) => {
  return <StyledSidebar {...props} />;
};
