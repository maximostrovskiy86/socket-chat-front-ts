import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import {authReducer} from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
