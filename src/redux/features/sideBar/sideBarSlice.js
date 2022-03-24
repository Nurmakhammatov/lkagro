import { createSlice } from "@reduxjs/toolkit";

export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: true,
  },
  reducers: {
    handleChangeKontur: (state, action) => {
      state.maps = action.payload;
    },
  },
});

export const { handleChangeKontur } = sideBarContursSlice.actions;

export default sideBarContursSlice.reducer;
