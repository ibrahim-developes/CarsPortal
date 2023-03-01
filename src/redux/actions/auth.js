// auth.js

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
      state.error = null;
     
    },
    logout: (state) => {
      state.token = null;
      AsyncStorage.removeItem('token') },
  },
});

export const {  loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
