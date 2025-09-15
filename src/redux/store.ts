import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth-reducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV === "development",
});


const persistor = persistStore(store);

const state = {
  store,
  persistor,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default state;
