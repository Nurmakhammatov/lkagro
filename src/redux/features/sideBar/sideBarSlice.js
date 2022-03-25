import { createSlice } from "@reduxjs/toolkit";

export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: true,
    chart: true,
    sidebar: true,
  },
  reducers: {
    handleChangeKontur: (state, action) => {
      state.maps = action.payload;
    },
    handleChangeIsChartOpen: (state, action) => {
      state.chart = action.payload;
    },
    handleChangeSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export const {
  handleChangeKontur,
  handleChangeIsChartOpen,
  handleChangeSidebar,
} = sideBarContursSlice.actions;

export default sideBarContursSlice.reducer;
