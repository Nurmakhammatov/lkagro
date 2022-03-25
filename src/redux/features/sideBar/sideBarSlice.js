import { createSlice } from "@reduxjs/toolkit";
export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: true,
    chart: true,
    sidebar: true,
    selectedIndex: false,
    centerMap: null,
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
    handleCenterMap: (state, action) => {
      state.centerMap = action.payload;
    },
  },
});

export const {
  handleChangeKontur,
  handleChangeIsChartOpen,
  handleChangeSidebar,
  handleSelectedIndex,
  handleCenterMap,
} = sideBarContursSlice.actions;

export default sideBarContursSlice.reducer;
