import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { text: newMessage, sender: "user" }]);
        setNewMessage("");

        try {
            const response = await axios.post('/api/chat/', { message: newMessage });
            setMessages([...messages, { text: newMessage, sender: "user" }, { text: response.data.reply, sender: "bot" }]);
        } catch (error) {
            console.error("Error in chatbot:", error);
        }
    };

    return (
        <div>
            <h2>Chatbot</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender}>{msg.text}</p>
                ))}
            </div>
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
