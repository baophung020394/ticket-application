import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import stylesGlobal from '../../../app.module.css';
interface FilterProps {
  onFilterChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onFilterChange(value);
  };

  return (
    <Box className={stylesGlobal['styledSearch']}>
      <TextField
        label="Search by description..."
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Filter;
