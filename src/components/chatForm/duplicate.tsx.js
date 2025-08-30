import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import style from "./chatForm.module.scss";
import socket from "../../lib/socket";

const ChatForm = () => {
	const [msg, setMsg] = useState("");
	const [messages, setMessages] = useState<string[]>([]);
	
	useEffect(() => {
		const onChatMessage = (payload: { message?: string } | string) => {
			const text = typeof payload === "string" ? payload : payload?.message;
			if (text) setMessages((prev) => [...prev, text]);
		};
		
		socket.on("CHAT_MESSAGE", onChatMessage);
		
		return () => {
			socket.off("CHAT_MESSAGE", onChatMessage);
		};
	}, []);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMsg(e.target.value);
	};
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmed = msg.trim();
		if (trimmed) {
			socket.emit("CHAT_MESSAGE", { message: trimmed });
			setMsg("");
		}
	};
	
	return (
		<div className={style.main}>
			<div style={{ marginBottom: 12 }}>
				{messages.length === 0 ? (
					<div style={{ color: "#888" }}>No messages yet</div>
				) : (
					<ul>
						{messages.map((m, idx) => (
							<li key={idx}>{m}</li>
						))}
					</ul>
				)}
			</div>
			
			<Form className={style.formMessage} onSubmit={handleSubmit}>
				<Form.Group className={style.inputMessage} controlId="formBasicEmail">
					<Form.Label>Message</Form.Label>
					<Form.Control
						type="text"
						placeholder="Type message..."
						value={msg}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button className={style.buttonMessage} variant="primary" type="submit">
					Send
				</Button>
			</Form>
		</div>
	);
};

export default ChatForm;
