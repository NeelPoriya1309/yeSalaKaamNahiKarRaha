import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import theme from '../config/theme';
import SideNav from '../components/SideNav';
import AppHeader from '../components/AppHeader';
import { ProSidebarProvider } from 'react-pro-sidebar';

const invalidPathsForUser = ['/video/upload'];

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Not logged in!');
      router.push('/login');
    }

    fetch(`/api/users/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status !== 'success') {
          alert(data.message);

          router.push('/login');
          return;
        }

        setUser(data.data.user);
        if (
          data &&
          data.data &&
          data.data.user &&
          data.data.user.role === 'user' &&
          invalidPathsForUser.includes(router.pathname)
        ) {
          alert('Invalid path for user! Redirecting to dashboard...');
          router.push('/dashboard');
        }
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <AppHeader user={user} />
          <Box sx={styles.container}>
            <SideNav user={user} />
            <Box component="main" sx={styles.mainSection}>
              <Component {...pageProps} />
            </Box>
          </Box>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc( 100% - 64px )',
  },
  mainSection: {
    p: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
};

export default MyApp;
