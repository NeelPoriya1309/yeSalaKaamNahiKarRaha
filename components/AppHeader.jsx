import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Logout, Notifications, Settings } from '@mui/icons-material';
import { useProSidebar } from 'react-pro-sidebar';
import { useRouter } from 'next/router';

const AppHeader = () => {
  const router = useRouter();

  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="secondary"
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Box component="img" sx={styles.appLogo} src="/logo.svg" />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton title="Notifications" color="secondary">
          <Badge badgeContent={14} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton title="Settings" color="secondary">
          <Settings />
        </IconButton>
        <IconButton onClick={handleLogout} title="Sign Out" color="secondary">
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: 'neutral.main',
  },
  appLogo: {
    ml: 1,
    width: 40,
    cursor: 'pointer',
  },
};

export default AppHeader;
