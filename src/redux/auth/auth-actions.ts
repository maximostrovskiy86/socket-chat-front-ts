import { createAction } from "@reduxjs/toolkit";

export const loginAuthRequest = createAction("auth/loginAuthRequest");
export const loginAuthSuccess = createAction("auth/loginAuthSuccess");
export const loginAuthError = createAction("auth/loginAuthError");

export const logOutAuthRequest = createAction("auth/logOutAuthRequest");
export const logOutAuthSuccess = createAction("auth/logOutAuthSuccess");
export const logOutAuthError = createAction("auth/logOutAuthError");