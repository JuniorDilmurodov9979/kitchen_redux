import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Slices/OrderSlice";
import getIdReducer from "./Slices/GetId";
export const store = configureStore({
  reducer: {
    order: orderReducer,
    getId: getIdReducer,
  },
});
