import "bootstrap/dist/css/bootstrap.min.css";
import style from "./App.module.scss";
import { ToastContainer } from "react-toastify";
import Container from "../container/Container";
import LoginPage from "../../pages/loginPage/LoginPage";
import ChatPage from "../../pages/chatPage/ChatPage";
import authSelector from "../../redux/auth/auth-selectors";
import { useSelector } from "react-redux";

const App = () => {
  const isAuth = useSelector(authSelector.isAuth);
  const isLoading = useSelector(authSelector.isLoading);

  return (
    <>
      <Container className={style.container}>
        {isLoading ? (
          <h2 className={style.loading}>Loading ...</h2>
        ) : isAuth ? (
          <ChatPage />
        ) : (
          <LoginPage />
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;
