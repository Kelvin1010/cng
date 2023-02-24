import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('usk')),
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      const user = JSON.stringify(action.payload);
      // localStorage.setItem('USER_KEY', user);
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;