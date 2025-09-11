import {Button} from "react-bootstrap";
import style from "./SideBar.module.scss";
import LogOut from "../iconSvgComponents/logOutButton/LogOut";
import {useAppSelector, useAppDispatch} from "../../hooks/Hooks";
import authOperations from "../../redux/auth/auth-operations.tsx";
import authSelectors from "../../redux/auth/auth-selectors.tsx";
import UserIsAdmin from "../user/UserIsAdmin.tsx";
import User from "../user/User.tsx";
import {SocketType, UserType, UserOnline} from "../../pages/chatPage/ChatPage.types.ts"

type Props = {
    allUsers: UserType[];
    usersOnline: UserOnline[];
    socket: SocketType;
}

const SideBar = ({allUsers, usersOnline, socket}: Props) => {
    const dispatch = useAppDispatch();
    const isAdmin = useAppSelector(authSelectors.isAdmin);

    const logOut = () => {
        socket?.disconnect();
        dispatch(authOperations.authLogout());
    };

    const onBannedUser = (id: string, isBanned: boolean) => {
        if (socket) {
            socket.emit("BAN_USER", {id, isBanned});
        }
    };

    const onMutedUser = (id: string, isMuted: boolean) => {
        socket?.emit("ON_MUTE", {id, isMuted});
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
                                onBannedUser={onBannedUser}
                                onMutedUser={onMutedUser}
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
