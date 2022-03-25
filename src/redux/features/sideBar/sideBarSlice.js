import { createSlice } from "@reduxjs/toolkit";

export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: true,
    chart: false,
  },
  reducers: {
    handleChangeKontur: (state, action) => {
      state.maps = action.payload;
    },
    handleChangeIsChartOpen: (state, action) => {
      state.chart = action.payload;
    },
  },
});

export const { handleChangeKontur, handleChangeIsChartOpen } =
  sideBarContursSlice.actions;

export default sideBarContursSlice.reducer;
