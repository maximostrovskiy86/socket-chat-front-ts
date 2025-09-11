import axios from "axios";

import {
    loginAuthRequest,
    loginAuthSuccess,
    loginAuthError,
    logOutAuthRequest,
    logOutAuthSuccess,
    logOutAuthError
} from "./auth-actions.tsx";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://socket-chat-back.onrender.com";

const tok = {

    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = "";
    },
};

const authLogin = (user) => async (dispatch) => {
    dispatch(loginAuthRequest());
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/login`, user);
        tok.set(data.token);
        dispatch(loginAuthSuccess(data));
    } catch (error) {
        dispatch(loginAuthError(error));
    }
};

const authLogout = () => async (dispatch) => {
    dispatch(logOutAuthRequest());

    try {
        dispatch(logOutAuthSuccess());
        tok.unset();
    } catch (error) {
        dispatch(logOutAuthError(error));
    }
}

const verify = (token) => async (dispatch) => {
    dispatch(loginAuthRequest());
    try {
        tok.set(token);
        const {data} = await axios.get(`${BASE_URL}/auth/verify`);
        dispatch(loginAuthSuccess(data));
    } catch (error) {
        dispatch(loginAuthError(error));
    }
};

const authOperations = {
    authLogin,
    authLogout,
    verify,
};

export default authOperations;
