import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadingGlobal = createAsyncThunk(
  'commons/loadingGlobal',
  async () => {
    return null;
  }
);
