import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface EmptyProps {
  title: string;
  description: string;
}

const Empty = ({ title, description }: EmptyProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="200px" // Chiều cao tối thiểu của Empty component
          padding="20px"
          borderRadius="8px"
          bgcolor="#f0f0f0" // Màu nền
        >
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" align="center">
            {description}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Empty;
