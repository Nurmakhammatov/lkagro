import { configureStore } from "@reduxjs/toolkit"
import sideBarContursSlice from "./features/sideBar/sideBarSlice"
import datePickerSlice from "./features/dates/datesSlice"

export default configureStore({
  reducer: {
    sideBarToggle: sideBarContursSlice,
    datePickers: datePickerSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})
