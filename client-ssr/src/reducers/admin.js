import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    token: '',
    error: '',
  },
  reducers: {
    adminConnect: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    tokenInfo: (state, action) => {
      state.token = action.payload.token;
    },
    errorInfo: (state, action) => {
      state.error = action.payload.error;
    }
  }
});

export const { adminConnect } = adminSlice.actions;
export const { tokenInfo } = adminSlice.actions;
export const { errorInfo } = adminSlice.actions;

export default adminSlice.reducer;