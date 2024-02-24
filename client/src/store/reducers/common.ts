import { createSlice } from '@reduxjs/toolkit';

interface CommonState {
  loading: boolean;
  loadingMenu: boolean;
  numberPerPage: number;
}

const initialState: CommonState = {
  loading: false,
  loadingMenu: true,
  numberPerPage: 10,
};

const commonsSlice = createSlice({
  name: 'commons',
  initialState,
  reducers: {
    setLoadingGlobal: (state, action) => {
      state.loading = action.payload;
    },
    openMenu: (state, action) => {
      state.loadingMenu = action.payload;
    },
    setNumberPerPage: (state, action) => {
      state.numberPerPage = action.payload;
    },
  },
});

export const { setLoadingGlobal, openMenu, setNumberPerPage } =
  commonsSlice.actions;

export default commonsSlice.reducer;
