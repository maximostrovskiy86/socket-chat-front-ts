import React from "react";
import { Button } from "react-bootstrap";
import style from "./SideBar.module.scss";
import LogOut from "../iconSvgComponents/logOutButton/LogOut";
import { useDispatch } from "react-redux";
import authOperations from "../../redux/auth/auth-operations.tsx";


const SideBar = () => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(authOperations.authLogout())
    }

  return (
    <div className={style.sideBar}>
      <Button className={style.logOut} variant="warning" onClick={logOut}>
        <LogOut />
      </Button>
    </div>
  );
}

export default SideBar;
