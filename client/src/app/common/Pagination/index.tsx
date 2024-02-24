// Pagination.tsx
import React from 'react';
import {
  Grid,
  MenuItem,
  Pagination as MuiPagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { RootState, useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { setNumberPerPage } from '../../../store/reducers/common';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const dispatch = useAppDispatch();
  const { numberPerPage } = useSelector((state: RootState) => state.commons);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const handleChangeItemsPerPage = (event: SelectChangeEvent<number>) => {
    const newNumberPerPage = event.target.value;
    dispatch(setNumberPerPage(newNumberPerPage));
  };

  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item xs={6}>
        <MuiPagination
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
          size="large"
          color="primary"
        />
      </Grid>
      <Grid xs={6}>
        <Select
          value={numberPerPage}
          onChange={handleChangeItemsPerPage}
          variant="standard"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default Pagination;
