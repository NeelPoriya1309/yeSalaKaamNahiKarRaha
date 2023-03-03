import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';

const Dashboard = () => {
  /*
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
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'success') {
          alert(data.message);

          router.push('/login');
          return;
        }

        setUser(data.data.user);
      });
  }, []);

  */
  return (
    <>
      <Typography varient="h6">DashBoard</Typography>
    </>
  );
};

/** @type {import('@mui/material').SxProps} */
const styles = {};

export default Dashboard;
