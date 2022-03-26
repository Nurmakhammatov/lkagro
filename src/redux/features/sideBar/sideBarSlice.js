import { createSlice } from "@reduxjs/toolkit";
export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: true,
    chart: true,
    sidebar: true,
    selectedIndex: false,
    centerMap: null,
    indexes: ["NDVI"],
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
    handleGetIndexes: (state, action) => {
      state.indexes = action.payload;
    },
  },
});

export const {
  handleChangeKontur,
  handleChangeIsChartOpen,
  handleChangeSidebar,
  handleSelectedIndex,
  handleCenterMap,
  handleGetIndexes,
} = sideBarContursSlice.actions;

export default sideBarContursSlice.reducer;
