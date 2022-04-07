import { createSlice } from "@reduxjs/toolkit"
export const sideBarContursSlice = createSlice({
  name: "sideBarToggle",
  initialState: {
    maps: true,
    chart: true,
    sidebar: true,
    selectedIndex: false,
    centerMap: null,
    indexes: ["NDVI"],
    areaMap: null,
    openBottomBar: false,
    fields: [],
    result: []
  },
  reducers: {
    handleSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload
    },
    handleChangeKontur: (state, action) => {
      state.maps = action.payload
    },
    handleChangeIsChartOpen: (state, action) => {
      state.chart = action.payload
    },
    handleChangeSidebar: (state, action) => {
      state.sidebar = action.payload
    },
    handleCenterMap: (state, action) => {
      state.centerMap = action.payload
    },
    handleGetIndexes: (state, action) => {
      state.indexes = action.payload
    },
    handleGetAreaMap: (state, action) => {
      state.areaMap = action.payload
    },
    handleOpenBottomBar: (state, action) => {
      state.openBottomBar = action.payload
    },
    handleGetFields: (state, action) => {
      state.fields = action.payload
    },
    handleGetFirstData: (state, action) => {
      state.result = action.payload
    }
  }
})

export const {
  handleChangeKontur,
  handleChangeIsChartOpen,
  handleChangeSidebar,
  handleSelectedIndex,
  handleCenterMap,
  handleGetIndexes,
  handleGetAreaMap,
  handleOpenBottomBar,
  handleGetFields,
  handleGetFirstData
} = sideBarContursSlice.actions

export default sideBarContursSlice.reducer
