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
        .addCase(loginAuthRequest, (_) => ({
            isLoading: true,
        }))
        .addCase(loginAuthSuccess, (state, action) => ({
            ...state,
            isLogIn: true,
            isLoading: false,
            ...action.payload.userData,
            token: action.payload.token,
        }))
        .addCase(loginAuthError, (_) => ({
            isLoading: false,
        }))

        // logOut
        .addCase(logOutAuthRequest, (_) => ({
            isLoading: true,
        }))

        .addCase(logOutAuthSuccess, () => ({
            ...initialState
        }))

        .addCase(logOutAuthError, (_) => ({
            isLoading: false,
        }))
	
})

const authReducers = combineReducers({
    user,
});

export default authReducers;
