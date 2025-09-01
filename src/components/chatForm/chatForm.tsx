import {Form, Button} from 'react-bootstrap';
import style from "./chatForm.module.scss";


const chatForm = ({onSubmit, onChange, msg}) => {

    return (
        <div className={style.main}>
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
