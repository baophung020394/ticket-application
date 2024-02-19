import { createSlice } from '@reduxjs/toolkit';

interface CommonState {
  loading: boolean;
}

const initialState: CommonState = {
  loading: false,
};

const commonsSlice = createSlice({
  name: 'commons',
  initialState,
  reducers: {
    setLoadingGlobal: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoadingGlobal } = commonsSlice.actions;

export default commonsSlice.reducer;
