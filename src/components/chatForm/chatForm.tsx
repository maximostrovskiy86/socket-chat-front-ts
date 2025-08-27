import React, {useState} from "react";
import { Form, Button } from 'react-bootstrap';
import style from "./chatForm.module.scss";
import axios from "axios";


const  chatForm = () =>  {

    const [msg, setMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setMsg(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        await axios.post("http://localhost:3030/", {msg: msg})
    }



  return (
    <div className={style.main}>
      <Form className={style.formMessage} onSubmit={handleSubmit}>
        <Form.Group className={style.inputMessage} controlId="formBasicEmail">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type message..."
            value={msg}
            onChange={handleChange}


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
