import { createSlice } from "@reduxjs/toolkit";
export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: false,
    chart: true,
    sidebar: true,
    selectedIndex: null,
  },
  reducers: {
    handleSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
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
  handleSelectedIndex,
} = sideBarContursSlice.actions;

export default sideBarContursSlice.reducer;
