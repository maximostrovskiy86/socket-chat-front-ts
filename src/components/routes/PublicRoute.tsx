import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";

export default function PublicRoute({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  component: Component,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  return <>{isLoggedIn ? <Navigate to={redirectTo} /> : Component}</>;
}
