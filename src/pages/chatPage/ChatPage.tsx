import style from "./ChatPage.module.scss";
import {Row, Col} from "react-bootstrap";
import Section from "../../components/section/Section.tsx";
import ChatForm from "../../components/chatForm/chatForm.tsx";
import Sidebar from "../../components/sideBar/SideBar.tsx";
import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";


function ChatPage() {

    const [msg, setMsg] = useState("");
    const [socket, setSocket] = useState<Socket | null | undefined>();

    useEffect(() => {
        setSocket(
            io("http://localhost:4000", {
                // reconnectionDelayMax: 10000,
                // auth: {
                //     token,
                // },
            })
        );

        // return () => {
        //     // io.disconnect();
        //     socket?.disconnect();
        //     setSocket(null);
        // };
    }, []);

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
                Welcome
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
