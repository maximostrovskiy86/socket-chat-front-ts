import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./App.module.scss";
import Container from "../container/Container.tsx";
import LoginPage from "../../pages/loginPage/LoginPage.tsx";
import ChatPage from "../../pages/chatPage/ChatPage.tsx";
import authSelector from "../../redux/auth/auth-selectors.tsx"
import {useSelector} from "react-redux";

function App() {
    const isAuth = useSelector(authSelector.isAuth);

    return (
        <Container className={style.container}>
            {isAuth ? <ChatPage/> : <LoginPage/>}
        </Container>
    )
}

export default App
