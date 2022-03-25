import { createSlice } from "@reduxjs/toolkit";
export const datePickerSlice = createSlice({
  name: "datePickers",
  initialState: {
    dateFrom: null,
    dateTo: null,
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
