import style from "./ChatPage.module.scss";
import {Row, Col} from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../hooks/Hooks";
import Section from "../../components/section/Section.tsx";
import ChatForm from "../../components/chatForm/chatForm.tsx";
import Sidebar from "../../components/sideBar/SideBar.tsx";
import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import authSelectors from "../../redux/auth/auth-selectors.tsx";


function ChatPage() {
    // const dispatch = useAppDispatch();
    const token = useAppSelector(authSelectors.isAuth);

    const [msg, setMsg] = useState("");
    const [socket, setSocket] = useState<Socket | null | undefined>();
    const [messages, setMessages] = useState([]);

    // console.log("SOCKET", socket)
    function getUserNameFromStorage() {
        const saveSettings: string | null = localStorage.getItem("persist:auth");
        const getUser =  JSON.parse(saveSettings)
        return saveSettings ? JSON.parse(getUser.user)?.username : "";
    }

    useEffect(() => {
        setSocket(
            io("http://localhost:4000", {
                reconnectionDelayMax: 10000,
                auth: {
                    token,
                },
            })
        );

        // return () => {
        //     // io.disconnect();
        //     socket?.disconnect();
        //     setSocket(null);
        // };
    }, []);

    useEffect(() => {
        if (token && socket) {
            socket.on("CHAT_UPDATE", ({ message }) => {
                setMessages((prev) => [...prev, message]);
            });


        }

        return () => {
            socket?.off("CHAT_UPDATE");
            socket?.off("GET_ONLINE_USERS");
            socket?.off("GET_ALL_USERS");
        };
    }, [socket, token]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value } = e.target;
        setMsg(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (msg) {
            const trimmed = msg.trim();
            if (trimmed && socket) {
                socket.emit("CHAT_MESSAGE", {message: trimmed});
                setMsg("");
            }

            setMsg("");
        }
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
                        />
                    </Section>
                </Col>
                <Col sm={4}>
                    <Section title="">
                        <Sidebar/>
                    </Section>
                </Col>
            </Row>
        </div>
    );
}

export default ChatPage;
