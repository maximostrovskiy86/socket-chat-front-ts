import style from './App.module.scss'
import Container from "../container/Container.tsx";
import LoginPage from "../../pages/loginPage/LoginPage.tsx";
import ChatPage from "../../pages/chatPage/ChatPage.tsx";

function App() {
    const isAuth = true;

    return (
        <Container>
            {isAuth ? <ChatPage/> : <LoginPage/>}
        </Container>
    )
}

export default App
