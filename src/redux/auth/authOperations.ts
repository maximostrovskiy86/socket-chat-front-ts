import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { User, RegisterResponse } from "./Auth.types";

axios.defaults.baseURL = "https://socket-chat-back.onrender.com";
// axios.defaults.baseURL = "http://localhost:4000";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk<AxiosResponse<RegisterResponse>, User>(
  "auth/registration",
  async (user: User, thunkAPI) => {
    try {
      return await axios.post<RegisterResponse>("/auth/registration", user);
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(err as unknown);
    }
  },
);

const login = createAsyncThunk("auth/login", async (user: User, thunkAPI) => {
  console.log("user", user);
  try {
    const response = await axios.post("/auth/login", user);
    token.set(response.data.accessToken);
    console.log("LOGIN", response);
    return response;
  } catch (err) {
    console.log("ERR", err);
    return thunkAPI.rejectWithValue(err);
  }
});

const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // const response = await axios.post('/auth/logout');
    token.unset();
    // return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// const authCurrentUserRefresh = createAsyncThunk('auth/refresh',
// 	async (_, thunkAPI) => {
// 		const state = thunkAPI.getState();
// 		const persistedToken = state.auth.accessToken;
//
// 		if (persistedToken === null) {
// 			return thunkAPI.rejectWithValue(undefined);
// 		}
//
// 		token.set(persistedToken);
// 		try {
// 			return await axios.get(`/tasks`);
// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(err);
// 		}
// 	})

const authOperations = {
  register,
  login,
  logOut,
  token,
};

export default authOperations;
