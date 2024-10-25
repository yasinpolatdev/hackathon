"use client";  // Add this at the very top

import { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: 'Hi, how can I assist you?', sender: 'bot' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      // Add user message to the conversation
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      try {
        // Make a request to Gemini API (or a similar chatbot service)
        const response = await axios.post('/api/generateContent', { message: input });

        // Assuming response has `data.message` as the chatbot's response
        const botMessage = { text: response.data.message, sender: 'bot' };  // Adjust response format here if necessary
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
        const botMessage = { text: "Sorry, there was an error.", sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }

      // Clear input
      setInput('');
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <style jsx>{`
        .chatbot {
          background-color: #f4f4f4;
          border-radius: 8px;
          padding: 20px;
          width: 300px;
        }
        .messages {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 10px;
        }
        .bot-message {
          background-color: #e0e0e0;
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
        }
        .user-message {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
          text-align: right;
        }
        .input-section {
          display: flex;
        }
        input {
          flex: 1;
          padding: 10px;
        }
        button {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
