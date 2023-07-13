import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import oneUserSlice from "./slices/oneUserSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    oneUser: oneUserSlice,
  },
});

export default store;
