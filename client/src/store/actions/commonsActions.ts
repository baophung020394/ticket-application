// actions/userActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getListUser } from '../../apis/user';

export const loadingGlobal = createAsyncThunk(
  'commons/loadingGlobal',
  async () => {
    return null;
  }
);
