import { IsState } from "./Auth.types";
const isAuth = (state: IsState) => {
  // console.log("state", state);
  return state.auth.token;
};
const userName = (state: IsState) => state.auth.user.username;
const createDate = (state: IsState) => state.auth.user.createdAt;
const isLoggedIn = (state: IsState) => state.auth.isLoggedIn;
const isAdmin = (state: IsState) => state.auth.user.isAdmin;
const isMuted = (state: IsState) => state.auth.user.isMuted;
const isLoading = (state: IsState)=> state.auth.isLoading;

const selectors = {
  isAuth,
  userName,
  createDate,
  isLoggedIn,
  isAdmin,
  isMuted,
  isLoading,
};

export default selectors;
