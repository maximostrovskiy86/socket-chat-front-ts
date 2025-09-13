import {combineReducers} from "redux";
import {createReducer} from "@reduxjs/toolkit";
import {
    loginAuthError,
    loginAuthRequest,
    loginAuthSuccess,
    logOutAuthRequest,
    logOutAuthSuccess,
    logOutAuthError,
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
        .addCase(loginAuthSuccess, (state, action: Action) => {
            console.log("action", action)
            console.log("state", state)
            return {
                ...state,
                isLogIn: true,
                isLoading: false,
                ...action.payload.userData,
                token: action.payload.token,
            }
        })
        // @ts-ignore
        .addCase(loginAuthError, () => ({
            isLoading: false,
        }))

        // @ts-ignore
        .addCase(logOutAuthRequest, () => ({
            isLoading: true,
        }))

        .addCase(logOutAuthSuccess, () => ({
            ...initialState
        }))
        // @ts-ignore
        .addCase(logOutAuthError, () => ({
            isLoading: false,
        }))
})


const authReducers = combineReducers({
    user,
});

export default authReducers;
