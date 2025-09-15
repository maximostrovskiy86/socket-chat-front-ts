import React, { useState, FormEvent } from "react";
import { useAppDispatch } from "../../hooks/Hooks";
import { Button } from "react-bootstrap";
import authOperations from "../../redux/auth/auth-operations";
import style from "./LoginForm.module.scss";

function LoginForm() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        return setUserName(value);
      case "password":
        return setPassword(value);
      default:
    }
  };

  const resetForm = (): void => {
    setUserName("");
    setPassword("");
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    dispatch(authOperations.authLogin({ username, password }));
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
          title="The password must be at least 7 characters long and may contain numbers, Latin letters and special characters ! @ # $ % ^ & *"
          required
          placeholder="Password *"
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
