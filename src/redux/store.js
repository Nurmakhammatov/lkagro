import { configureStore } from "@reduxjs/toolkit";
import sideBarContursSlice from "./features/sideBar/sideBarSlice";

export default configureStore({
  reducer: {
    sideBarToggle: sideBarContursSlice,
  },
});
