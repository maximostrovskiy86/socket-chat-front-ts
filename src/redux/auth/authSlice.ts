import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authOperations from "./authOperations";
import { IsState } from "./Auth.types";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isLoggedIn", "user"],
};

const initialState = {
  user: {
    _id: "",
    username: "",
    password: "",
    isOnline: false,
    isBanned: false,
    isMuted: false,
    isAdmin: false,
    createdAt: "",
    updatedAt: "",
  },
  isLoggedIn: false,
  token: "",
  isLoading: false,
  error: null,
} satisfies IsState["auth"] as IsState["auth"];

const handlePending = (state: IsState["auth"]): void => {
  console.log("handlePending", state.isLoading);
  state.isLoading = true;
};

// const handleRejected = (state: AuthState, action): void => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register reducer
      .addCase(authOperations.register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authOperations.register.fulfilled, (state) => {
        // state.user = action.payload.data.user;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authOperations.register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // login reducer
      .addCase(authOperations.login.pending, handlePending)
      .addCase(authOperations.login.fulfilled, (state, action) => {
        state.user = action.payload.data.userData;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authOperations.login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // logOut reducer
      .addCase(authOperations.logOut.pending, handlePending)
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authOperations.logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
