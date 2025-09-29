import React from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  return isLoggedIn ? Component : <Navigate to={redirectTo} />
};
export default PrivateRoute;
