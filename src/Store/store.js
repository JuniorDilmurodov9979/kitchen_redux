import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Slices/OrderSlice";
import getIdReducer from "./Slices/GetId";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

// Persist config
const orderConfig = {
  key: "order",
  storage,
};
const getIdConfig = {
  key: "getId",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  order: persistReducer(orderConfig, orderReducer),
  getId: persistReducer(getIdConfig, getIdReducer),
});

// Configure store with middleware adjustments
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ Ignore Redux Persist actions
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
