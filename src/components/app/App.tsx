import "bootstrap/dist/css/bootstrap.min.css";
import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "../container/Container";
import LoginPage from "../../pages/loginPage/LoginPage";
import ChatPage from "../../pages/chatPage/ChatPage";
import NotFoundPage from "../../pages/notFound";
import RegisterPage from "../../pages/registerPage/RegisterPage";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import authSelector from "../../redux/auth/authSelectors";
import { useSelector } from "react-redux";

const App = () => {
  const isLoading = useSelector(authSelector.isLoading);

  return (
    <>
      {isLoading ? (
        <h2 className={style.loading}>Loading ...</h2>
      ) : (
        <Container className={style.container}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute redirectTo="/login" component={<ChatPage />} />
              }
            />
            <Route
              path="/registration"
              element={
                <PublicRoute redirectTo="/chat" component={<RegisterPage />} />
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/chat" component={<LoginPage />} />
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute redirectTo="/login" component={<ChatPage />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
