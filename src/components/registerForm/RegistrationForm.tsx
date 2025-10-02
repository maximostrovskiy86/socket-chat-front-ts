import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/Hooks";
import { useNavigate } from "react-router";
import style from "./RegistrationForm.module.scss";
import { Button } from "react-bootstrap";
import authOperations from "../../redux/auth/authOperations";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const notifySuccessCreated = (email: string, name: string) =>
    toast.success(`User with email ${email} and name ${name} created!`);
  const notifyExistsUser = (email: string) =>
    toast.error(`Registration failed ${email}`);
  const unValidation = () => {
    toast.error(
      `The name must contain more than two and no more than 20 characters`,
    );
  };

  const isValid = (el: string) => {
    if (el.length <= 2 || el.length > 20) {
      unValidation();
      return;
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    await isValid(username);

    try {
      const response = await dispatch(
        authOperations.register({
          email,
          username,
          password,
        }),
      ).unwrap();

      resetForm();

      if (response.status === 201) {
        notifySuccessCreated(
          response.data.userData.email,
          response.data.userData.username,
        );
        navigate("/login");
        return;
      }
    } catch (err) {
      console.error("Registration failed", err);
      notifyExistsUser(email);
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
      <h2 className={style.h2}>Registration</h2>
      <label className={style.formLabel} htmlFor="name">
        <input
          id="name"
          type="text"
          name="username"
          value={username}
          required
          title="The name can only consist of Latin letters, apostrophes, dashes and spaces. For example, Adrian, Jacob Mercer, Castelmore d'Artagnan, etc."
          onChange={onHandleChange}
          className={style.field}
          placeholder="Name"
        />
      </label>
      <label className={style.formLabel} htmlFor="login">
        <input
          id="login"
          type="email"
          name="email"
          required
          value={email}
          pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
          title="Email must contain the @ symbol and be in the format example@mail.com"
          onChange={onHandleChange}
          className={style.field}
          placeholder="Email"
        />
      </label>
      <label className={style.formLabel} htmlFor="password">
        <input
          id="password"
          type="password"
          name="password"
          required
          value={password}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="The password must be at least 7 characters long and may contain numbers, Latin letters and special characters ! @ # $ % ^ & *"
          onChange={onHandleChange}
          className={style.field}
          placeholder="Password *"
        />
      </label>
      <p>
        You have an account! You can{" "}
        <strong>
          <Link to="/login">Sign In</Link>
        </strong>
      </p>
      <div className={style.buttonBlock}>
        <Button className={style.button} type="submit">
          REGISTER
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
