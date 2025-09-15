import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  loginAuthError,
  loginAuthRequest,
  loginAuthSuccess,
  logOutAuthError,
  logOutAuthRequest,
  logOutAuthSuccess,
} from "./auth-actions";

import { Action } from "./Auth.types";

const initialState = {
  isLogIn: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const user = createReducer(initialState, (builder) => {
  builder
    // @ts-ignore
    .addCase(loginAuthRequest, () => ({
      isLoading: true,
    }))
    // @ts-ignore
    .addCase(loginAuthSuccess, (state, action: Action) => ({
      ...state,
      isLogIn: true,
      isLoading: false,
      ...action.payload.userData,
      token: action.payload.token,
    }))
    // @ts-ignore
    .addCase(loginAuthError, () => ({
      isLoading: false,
    }))
    // @ts-ignore
    .addCase(logOutAuthRequest, () => ({
      isLoading: true,
    }))
    .addCase(logOutAuthSuccess, () => ({
      ...initialState,
    }))
    // @ts-ignore
    .addCase(logOutAuthError, () => ({
      isLoading: false,
    }));
});

const authReducers = combineReducers({
  user,
});

export default authReducers;
