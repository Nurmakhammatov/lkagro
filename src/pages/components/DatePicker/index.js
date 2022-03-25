import * as React from "react";
import uzLocale from "date-fns/locale/uz";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSelectDateFrom,
  handleSelectDateTo,
} from "../../../redux/features/dates/datesSlice";

export default function BasicDatePicker({ label, value }) {
  const dispatch = useDispatch();
  const dateFrom = useSelector((state) => state.datePickers.dateFrom);
  const dateTo = useSelector((state) => state.datePickers.dateTo);

  return (
    <>
      <Box mt={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={uzLocale}>
          <DatePicker
            label="Сана танланг (дан)"
            value={dateFrom}
            onChange={(newValue) => {
              dispatch(handleSelectDateFrom(newValue));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box mt={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={uzLocale}>
          <DatePicker
            label="Сана танланг (гача)"
            value={dateTo}
            onChange={(newValue) => {
              dispatch(handleSelectDateTo(newValue));
            }}
            renderInput={(params) => <TextField {...params} />}
            disabled={!dateFrom}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
}
