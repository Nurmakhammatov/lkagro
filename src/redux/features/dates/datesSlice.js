import { createSlice } from "@reduxjs/toolkit";
export const datePickerSlice = createSlice({
  name: "datePickers",
  initialState: {
    dateFrom:
      "Fri Jan 01 2021 03:37:55 GMT+0500 (Узбекистан, стандартное время)",
    dateTo: "Sat Jan 01 2022 03:37:55 GMT+0500 (Узбекистан, стандартное время)",
  },
  reducers: {
    handleSelectDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    handleSelectDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
  },
});

export const { handleSelectDateFrom, handleSelectDateTo } =
  datePickerSlice.actions;

export default datePickerSlice.reducer;
