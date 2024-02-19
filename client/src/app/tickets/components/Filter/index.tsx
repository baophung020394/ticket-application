import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styledSearch } from '../../../../constants/styles.common';

interface FilterProps {
  onFilterChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onFilterChange(value);
  };

  return (
    <TextField
      style={styledSearch}
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
  );
};

export default Filter;
