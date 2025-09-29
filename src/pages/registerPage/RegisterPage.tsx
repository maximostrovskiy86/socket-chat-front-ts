import style from "./RegisterPage.module.scss";
import RegistrationForm from "../../components/registerForm/RegistrationForm";

const RegisterPage = () => {
  return (
    <div className={style.formWrapper}>
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
