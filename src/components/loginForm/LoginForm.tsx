import React, { useState, FormEvent } from "react";
import { useAppDispatch } from "../../hooks/Hooks";
import { Button } from "react-bootstrap";
import authOperations from "../../redux/auth/authOperations";
import style from "./LoginForm.module.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import type { ErrorResponse } from "../../redux/auth/Auth.types";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
    }
  };

  const notifyIncorrectUser = (err: unknown) => toast.error(`${err}`);

  const resetForm = (): void => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      await dispatch(authOperations.login({ email, password })).unwrap();
      resetForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404 || status === 401) {
          const msg =
            (err as AxiosError<ErrorResponse>).response?.data?.data?.message ??
            "Incorrect credentials";
          notifyIncorrectUser(msg);
          return;
        }
      }
      notifyIncorrectUser("unknown error");
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
      <h2 className={style.h2}>Login</h2>
      <label className={style.formLabel} htmlFor="email">
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          // pattern="[a-zA-Z]"
          title="The name can consist of numbers, Latin letters and special characters @ $ &"
          // required
          placeholder="Email"
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
      <p>Do not have an account? </p>
      <p>
        You can
        <strong>
          <Link to="/registration"> Sign Up</Link>
        </strong>
      </p>
      <div className={style.buttonBlock}>
        <Button className={style.button} type="submit">
          LOG IN
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
