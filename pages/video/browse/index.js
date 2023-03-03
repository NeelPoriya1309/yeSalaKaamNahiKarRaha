import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import VideoCard from '../../../components/VideoCard';

const BrowseVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`/api/videos`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (!responseData) return alert('Some Error Occured!');
        if (responseData.error) return alert(responseData.message);
        console.log(responseData);
        setVideos(responseData.data.videos);
      });
  }, []);

  return (
    <Grid container spacing={2} sx={{ width: '80%', ml: '10%' }}>
      {videos &&
        videos.length !== 0 &&
        videos.map((video, idx) => (
          <Grid key={idx} item sx={8}>
            <VideoCard details={video} />
          </Grid>
        ))}
    </Grid>
  );
};

export default BrowseVideos;
