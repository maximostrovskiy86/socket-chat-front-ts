import style from "./ChatPage.module.scss";
import {Row, Col} from "react-bootstrap";
import {useAppSelector, useAppDispatch} from "../../hooks/Hooks";
import Section from "../../components/section/Section.tsx";
import ChatForm from "../../components/chatForm/chatForm.tsx";
import Sidebar from "../../components/sideBar/SideBar.tsx";
import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import authSelectors from "../../redux/auth/auth-selectors.tsx";
import authOperations from "../../redux/auth/auth-operations.tsx";
import {updateUserSuccess} from "../../redux/auth/auth-actions.tsx";


function ChatPage() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(authSelectors.isAuth);
    const userName = useAppSelector(authSelectors.userName);


    const [msg, setMsg] = useState("");
    const [socket, setSocket] = useState<Socket | null | undefined>();
    const [messages, setMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [usersOnline, setUsersOnline] = useState([]);

    function getUserNameFromStorage() {
        const saveSettings: string | null = localStorage.getItem("persist:auth");
        const getUser = JSON.parse(saveSettings)
        return saveSettings ? JSON.parse(getUser.user)?.username : "";
    }

    useEffect(() => {
        setSocket(
            io("http://localhost:4000", {
                // reconnectionDelayMax: 10000,
                auth: {
                    token,
                },
            })
        );

        return () => {
            console.log("DISCONECT-1")
            socket?.disconnect();
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (token && socket) {
            socket.on("GET_ALL_MESSAGES", (allMessages) => {
                // console.log("allMessage", allMessages);
                setMessages(allMessages);

            })

            socket.on("CHAT_UPDATE", ({message}) => {
                // console.log("CHAT_MESSAGE", message);
                setMessages((prev) => [...prev, message]);
            });

            socket.on("GET_ALL_USERS", (allUsers) => {
                // console.log("GET_ALL_USERS", allUsers);
                setAllUsers(allUsers);
            });

            socket.on("GET_ONLINE_USERS", (usersOnline) => {
                // console.log("GET_ONLINE_USER", usersOnline)
                setUsersOnline(usersOnline)
            })

            socket.on("USER_UPDATE", (user) => {
                console.log("USER_UPDATE,", user);
                // dispatch(updateUserSuccess(user));
            });

            socket.on("disconnect", () => {
                console.log("user disconnected");
                dispatch(authOperations.authLogout());
            });

        }

        return () => {
            socket?.off("CHAT_UPDATE");
            socket?.off("GET_ONLINE_USERS");
            socket?.off("GET_ALL_USERS");
            socket?.off("GET_ALL_MESSAGES");
        };
    }, [socket]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMsg(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (msg) {
            socket?.emit("CHAT_MESSAGE", {
                message: msg.trim(),
                username: userName
            });
        }

        setMsg("");
    }

    // if (!socket) {
    //   return <></>;
    // }

    return (
        <div className={style.chat}>
            <h3 style={{textAlign: "center"}}>
                Welcome {getUserNameFromStorage()}
            </h3>
            <Row className={style.rowBox}>
                <Col sm={8}>
                    <Section title="">
                        <ChatForm
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            msg={msg}
                            messages={messages}
                        />
                    </Section>
                </Col>
                <Col sm={4}>
                    <Section title="">
                        <Sidebar
                            allUsers={allUsers}
                            socket={socket}
                            usersOnline={usersOnline}
                        />
                    </Section>
                </Col>
            </Row>
        </div>
    );
}

export default ChatPage;
