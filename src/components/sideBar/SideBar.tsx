import {Button} from "react-bootstrap";
import style from "./SideBar.module.scss";
import LogOut from "../iconSvgComponents/logOutButton/LogOut";
import {useDispatch, useSelector} from "react-redux";
import authOperations from "../../redux/auth/auth-operations.tsx";
import authSelectors from "../../redux/auth/auth-selectors.tsx";
import User from "../user/User.tsx";
import UserIsAdmin from "../user/UserIsAdmin.tsx";


const SideBar = ({allUsers, usersOnline, socket}) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(authSelectors.isAdmin);

    const logOut = () => {
        socket.disconnect();
        dispatch(authOperations.authLogout());
    };

    return (
        <div className={style.sideBar}>
            <Button className={style.logOut} variant="warning" onClick={logOut}>
                <LogOut/>
            </Button>
            {isAdmin ? (
                <ul className={style.listUsers}>
                    {allUsers &&
                        allUsers.map((user) => (
                            <UserIsAdmin
                                key={user._id}
                                username={user.username}
                                id={user._id}
                                isBanned={user.isBanned}
                                isOnline={user.isOnline}
                                isMuted={user.isMuted}
                                // onBannedUser={onBannedUser}
                                // onMutedUser={onMutedUser}
                            />
                        ))}
                </ul>
            ) : (
                usersOnline &&
                usersOnline.map((user) => (
                    <User key={user.id} username={user.username}/>
                ))
            )}

        </div>
    );
}

export default SideBar;
