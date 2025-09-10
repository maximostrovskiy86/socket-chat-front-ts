import {useState} from "react";
import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";
import authOperations from "../../redux/auth/auth-operations.tsx"
import style from "./LoginForm.module.scss";


function LoginForm() {
    const [username, setUserName] = useState("Max");
    const [password, setPassword] = useState("2wsx@WSX");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        // const { name, value, id } = target as Test;
        const {name, value} = e.target;
        switch (name) {
            case "username":
                return setUserName(value);
            case "password":
                return setPassword(value);
            default:
        }
    };

    const resetForm = () => {
        setUserName("");
        setPassword("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authOperations.authLogin({username, password}));
        resetForm();
    };

    return (
        <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
            <label className={style.formLabel} htmlFor="username">
                <input
                    id="username"
                    type="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    // pattern="[a-zA-Z]"
                    // title="The name can consist of numbers, Latin letters and special characters @ $ &"
                    required
                    placeholder="Login *"
                    className={style.field}
                />
            </label>

            <label className={style.formLabel} htmlFor="password">
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    pattern="[0-9a-zA-Z!@#$%^&*]{6,}"
                    // title="The password must be at least 7 characters long and may contain numbers, Latin letters and special characters ! @ # $ % ^ & *"
                    required
                    placeholder="Пароль *"
                    className={style.field}
                />
            </label>

            <div className={style.buttonBlock}>
                <Button className={style.button} type="submit">
                    LOG IN
                </Button>
            </div>
        </form>
    );
}

export default LoginForm;
