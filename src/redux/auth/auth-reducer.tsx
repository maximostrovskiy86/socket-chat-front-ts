import {combineReducers} from "redux";
import {createReducer} from "@reduxjs/toolkit";
import {
    loginAuthError,
    loginAuthRequest,
    loginAuthSuccess,
    logOutAuthRequest,
    logOutAuthSuccess,
    logOutAuthError,
    updateUserSuccess,
} from "./auth-actions.tsx";
import state from "../store.tsx";

const initialState = {
    isLogIn: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

const user = createReducer(initialState, (builder) => {
    builder

        // login
        .addCase(loginAuthRequest, (_, action) => ({
            isLoading: true,
            ...action.payload,
        }))
        .addCase(loginAuthSuccess, (state, action) => ({
            ...state,
            isLogIn: true,
            isLoading: false,
            ...action.payload.userData,
            token: action.payload.token,
        }))
        .addCase(loginAuthError, (_, action) => ({
            isLoading: false,
            ...action.payload,
        }))

        // logOut
        .addCase(logOutAuthRequest, (_, action) => ({
            isLoading: true,
            ...action.payload,
        }))

        .addCase(logOutAuthSuccess, () => ({
            ...initialState
        }))

        .addCase(logOutAuthError, (_, action) => ({
            isLoading: false,
            ...action.payload,
        }))

        // update user
        .addCase(updateUserSuccess, (_, action) => {
            console.log("action", action)

            return {
                ...state,
                // ...action.payload,
            }
        })
})

// [updateUserSuccess]: (_, { payload }) => ({ ...payload }),


const authReducers = combineReducers({
    user,
});

export default authReducers;
