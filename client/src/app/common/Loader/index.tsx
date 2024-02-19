import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface LoaderAnimationProps {
  height?: string | number;
}
const LoaderAnimation: React.FC<LoaderAnimationProps> = ({ height }) => {
  const styleLoading = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height || '100%',
  };

  return (
    <Box style={styleLoading}>
      <CircularProgress />
    </Box>
  );
};

export default LoaderAnimation;
