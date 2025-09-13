import {combineReducers} from "redux";
import {createReducer} from "@reduxjs/toolkit";
import {
    loginAuthSuccess,
    logOutAuthSuccess,
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
		
        .addCase(loginAuthSuccess, (state, action) => ({
            ...state,
            isLogIn: true,
            isLoading: false,
            ...action.payload?.userData,
            token: action.payload?.token,
        }))
        .addCase(logOutAuthSuccess, () => ({
            ...initialState
        }))
})

const authReducers = combineReducers({
    user,
});

export default authReducers;
