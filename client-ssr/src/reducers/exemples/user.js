import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'admin',
  initialState: {
    firstName: '',
    lastName: '',
    email: ''
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    }
  }
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;