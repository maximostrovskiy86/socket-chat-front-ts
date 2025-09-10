// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {configureStore} from "@reduxjs/toolkit";

import {
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
    persistReducer,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth-reducer.tsx";

// const middleware = [
// ({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   // logger,
// ];

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

    // middleware,
    // devTools: process.env.NODE_ENV === "development",
});

// export default store;
const persistor = persistStore(store);

const state = {
    store,
    persistor,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default state;
