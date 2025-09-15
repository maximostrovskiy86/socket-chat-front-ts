import { IsState } from "./Auth.types";

const loginSocket = (state: IsState) => {
  return state.auth;
};
const isAuth = (state: IsState) => {
  return state.auth.user.token;
};
const userName = (state: IsState) => state.auth.user.username;
const createDate = (state: IsState) => state.auth.user.createdAt;
const isLoggedIn = (state: IsState) => state.auth.user.isLogIn;
const isAdmin = (state: IsState) => state.auth.user.isAdmin;
const isMuted = (state: IsState) => state.auth.user.isMuted;
const isLoading = (state: IsState)=> state.auth.user.isLoading;

const selectors = {
  loginSocket,
  isAuth,
  userName,
  createDate,
  isLoggedIn,
  isAdmin,
  isMuted,
  isLoading,
};

export default selectors;
