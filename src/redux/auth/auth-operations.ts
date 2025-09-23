import axios from "axios";
import {
  loginAuthRequest,
  loginAuthSuccess,
  loginAuthError,
  logOutAuthRequest,
  logOutAuthSuccess,
  logOutAuthError,
} from "./auth-actions";
import { User } from "./Auth.types";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://socket-chat-back.onrender.com";

const tok = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const authLogin =
  (user: User) =>
  async (
    dispatch: (arg0: {
      payload: undefined;
      type:
        | "auth/loginAuthRequest"
        | "auth/loginAuthSuccess"
        | "auth/loginAuthError";
    }) => void,
  ) => {
    dispatch(loginAuthRequest());
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, user);
      tok.set(data.token);
      dispatch(loginAuthSuccess(data));
      return data;
    } catch (error) {
      // @ts-ignore
      dispatch(loginAuthError(error));
      return error;
    }
  };

const authLogout =
  () =>
  async (
    dispatch: (arg0: {
      payload: undefined;
      type:
        | "auth/logOutAuthRequest"
        | "auth/logOutAuthSuccess"
        | "auth/logOutAuthError";
    }) => void,
  ) => {
    dispatch(logOutAuthRequest());

    try {
      dispatch(logOutAuthSuccess());
      tok.unset();
    } catch (error) {
      // @ts-ignore
      dispatch(logOutAuthError(error));
    }
  };

const authOperations = {
  authLogin,
  authLogout
};

export default authOperations;
