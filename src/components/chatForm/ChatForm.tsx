import React, {useRef, useEffect, useMemo} from 'react';
import {Form, Button} from 'react-bootstrap';
import style from "./ChatForm.module.scss";
import moment from "moment";
import { Message } from "../../pages/chatPage/ChatPage.types";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    msg: string;
    messages: Message[];
    isMuted: boolean;
}

const ChatForm = ({onSubmit, onChange, msg, messages, isMuted}: Props) => {
    const scrollRef = useRef<HTMLLIElement>(null);

    const renderMessages = useMemo((): Message[] => {
        return messages.slice();
    }, [messages])

    useEffect((): void => {

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }

    }, [messages])

    return (
        <div className={style.main}>
            <ul className={style.listMessage}>
                {renderMessages &&
                    renderMessages.map((mess) => (
                        <li className={style.messageBox} key={mess._id}>
                            <span className={style.name}>{mess.username}</span>
                            <span className={style.message}>{mess.message}</span>
                            <span
                                className={style.time}>{moment(mess.createdAt).format("YYYY-MM-DD HH:mm")}</span>
                        </li>
                    ))}
                <li className="scroll" ref={scrollRef}>
                    &nbsp;
                </li>
            </ul>
            <Form className={style.formMessage} onSubmit={onSubmit}>
                <Form.Group className={style.inputMessage} controlId="formBasicEmail">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type message..."
                        value={msg}
                        onChange={onChange}
                        // pattern="[0-9a-zA-Z!@#$%^&*~'`]{1,200}"
                    />
                </Form.Group>
                <Button
                    className={style.buttonMessage}
                    variant="primary"
                    type="submit"
                    disabled={isMuted}
                >
                    Send
                </Button>
            </Form>
        </div>
    );
}

export default ChatForm;
