import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function VideoCard({ details }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <iframe
        src={`https://drive.google.com/file/d/${details.gDriveID}/preview`}
        style={{ minHeight: 230, width: '100%' }}
        allow="autoplay"
        allowFullScreen
      ></iframe>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {details.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {details.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="primary">
          Categories
        </Typography>
        {details.categories.map((category, idx) => (
          <Typography
            key={idx}
            sx={{
              ml: 2,
              mt: 0.5,
              borderRadius: 5,
              bgcolor: 'primary.light',
              width: 'fit-content',
              pl: 1,
              pr: 1,
            }}
            variant="body2"
            color="white"
          >
            {category.name}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
