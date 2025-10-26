import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'; // Import the skeleton loader
import './ChatApp.css'; 

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I assist you?", sender: "bot" },
    { text: "I have a question about React.", sender: "user" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Simulating sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return; // Don't send empty messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);
    setInput(""); // Clear input
    setLoading(true);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "This is a bot response to your message.", sender: "bot" },
      ]);
      setLoading(false); // Stop loading once the bot responds
    }, 1500); // Simulate a response delay
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender}`}
          >
            {loading && index === messages.length - 1 && message.sender === "bot" ? (
              <Skeleton count={1} height={30} width="80%" />
            ) : (
              <p>{message.text}</p>
            )}
          </div>
        ))}
      </div>


        {/* input field */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
