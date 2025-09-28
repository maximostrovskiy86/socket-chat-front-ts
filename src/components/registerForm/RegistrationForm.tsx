import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/Hooks";
import { useNavigate } from "react-router";
import style from "./RegistrationForm.module.scss";
import { Button } from "react-bootstrap";
import authOperations from "../../redux/auth/authOperations";
import { toast } from "react-toastify";

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

  // const notifySuccessCreated = (email, name) =>
  //   toast.success(`User ${email} and name ${name} created!`);
  // const notifyExistsUser = (email) =>
  //   toast.error(`User ${email} already exists!`);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const response = await dispatch(
      authOperations.register({
        email,
        username,
        password,
      }),
    );

    console.log("response", response);

    resetForm();

    //   if (response.payload.status === 201) {
    //     notifySuccessCreated(
    //       response.payload.data.email,
    //       response.payload.data.username,
    //     );
    //     navigate("/login");
    //
    //     return;
    //   }
    //
    //   notifyExistsUser(response.meta.arg.email);
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
      <input
        id="name"
        type="text"
        name="username"
        value={username}
        title="The name can only consist of Latin letters, apostrophes, dashes and spaces. For example, Adrian, Jacob Mercer, Castelmore d'Artagnan, etc."
        onChange={onHandleChange}
      />
      <label htmlFor="name">Name</label>

      <input
        id="login"
        type="email"
        name="email"
        required
        value={email}
        pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
        title="Email must contain the @ symbol and be in the format example@mail.com"
        onChange={onHandleChange}
      />
      <label htmlFor="login">Login</label>

      <input
        id="password"
        type="password"
        name="password"
        required
        value={password}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="The password must be at least 7 characters long and may contain numbers, Latin letters and special characters ! @ # $ % ^ & *"
        onChange={onHandleChange}
      />
      <label htmlFor="password">Password</label>

      <Button>Registration</Button>
    </form>
  );
};

export default RegistrationForm;
