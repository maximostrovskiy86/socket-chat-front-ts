import {combineReducers} from "redux";
import {createReducer} from "@reduxjs/toolkit";
import {
    loginAuthError,
    loginAuthRequest,
    loginAuthSuccess,
    logOutAuthRequest,
    logOutAuthSuccess,
    logOutAuthError
    // updateUserSuccess,
} from "./auth-actions.js";

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
})

// .addCase(updateUserSuccess, (state, action) => {
//     ({
//         ...action.payload
//     })
// }
// [loginAuthSuccess]: (_, { payload }) => ({
//   isLogIn: true,
//   ...payload.user,
// }),
// [logOutAuthSuccess]: () => initialState,
// [updateUserSuccess]: (_, { payload }) => ({ ...payload }),
// });

// const token = createReducer(initialState, {
//   [loginAuthSuccess]: (_, { payload }) => payload.token,
//   [logOutAuthSuccess]: () => null,
// });

const authReducers = combineReducers({
    user,
    // token,
});

export default authReducers;
