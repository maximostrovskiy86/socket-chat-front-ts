import React from "react";
import style from "./ChatPage.module.scss";
import {Row, Col} from "react-bootstrap";
import Section from "../../components/section/Section.tsx";
import ChatForm from "../../components/chatForm/chatForm.tsx";
import Sidebar from "../../components/sideBar/SideBar.tsx";


function ChatPage() {

    // if (!socket) {
    //   return <></>;
    // }

    return (
        <div className={style.chat}>
            <h3 style={{textAlign: "center"}}>
                {/*Welcome {getUserNameFromStorage()}*/}
            </h3>
            <Row className={style.rowBox}>
                <Col sm={8}>
                    <Section title="">
                        <ChatForm/>
                    </Section>
                </Col>
                <Col sm={4}>
                    <Section title="">
                        <Sidebar/>
                    </Section>
                </Col>
            </Row>
        </div>
    );
}

export default ChatPage;
