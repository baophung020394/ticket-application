import { createAsyncThunk } from '@reduxjs/toolkit';
import { getListUser } from '../../apis/user';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getListUser();
  return response.data;
});
