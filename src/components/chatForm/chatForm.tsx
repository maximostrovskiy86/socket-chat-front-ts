import { useRef, useEffect } from 'react';
import {Form, Button} from 'react-bootstrap';
import style from "./chatForm.module.scss";
import moment from "moment";


const chatForm = ({onSubmit, onChange, msg, messages}) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        console.log("scrollRef", scrollRef)
        scrollRef?.current.scrollIntoView({ behavior: "smooth" });
    })

    return (
        <div className={style.main}>
            <ul className={style.listMessage}>
                {messages &&
                    messages.map((mess) => (
                        <li className={style.messageBox} key={mess._id}>
                            <span className={style.name}>{mess.name || mess.username}</span>
                            <span className={style.message}>{mess.message}</span>
                            <span className={style.time}>{moment(mess.time || mess.createdAt).format("YYYY-MM-DD HH:mm")}</span>
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
                >
                    Send
                </Button>
            </Form>
        </div>
    );
}

export default chatForm;
