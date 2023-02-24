import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    sidebarShow: true,
    sidebarUnfoldable: false,
    canToggleSidebar: true,
  },
  reducers: {
    setSidebarVisible: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload;
    },
    setCanToggleSidebar: (state, action) => {
      state.canToggleSidebar = action.payload;
    },
  },
});

export const { setSidebarVisible, setSidebarUnfoldable, setCanToggleSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;