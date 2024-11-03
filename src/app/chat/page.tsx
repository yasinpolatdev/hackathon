// src/app/chat/page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apolloclient"; // Adjust the path as needed
import Chat from "../components/chat"; // Adjust the path as needed
import ErrorBoundary from "../components/ErrorBoundary"; // Adjust the path as needed

const ChatPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Sanitize the username to prevent XSS attacks
  const sanitizeUsername = (username: string) => {
    const div = document.createElement("div");
    div.textContent = username;
    return div.innerHTML;
  };

  // Load username from local storage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(sanitizeUsername(savedUsername));
    }
  }, []);

  // Save username to local storage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", sanitizeUsername(username));
    }
  }, [username]);

  // Handle username input change
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    // Validate username
    if (newUsername.trim() === "") {
      setError("Kullanıcı adı boş olamaz.");
    } else if (newUsername.length < 3) {
      setError("Kullanıcı adı en az 3 karakter olmalıdır.");
    } else {
      setError("");
    }
  };

  return (
    <ApolloProvider client={client}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Chatbot</h1>
        <input
          type="text"
          placeholder="Kullanıcı adınızı girin"
          value={username}
          onChange={handleUsernameChange}
          style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <ErrorBoundary message="Chat bileşeni yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.">
          {username && !error ? (
            <Chat username={username} />
          ) : (
            <p>Lütfen geçerli bir kullanıcı adı girin.</p>
          )}
        </ErrorBoundary>
      </div>
    </ApolloProvider>
  );
};

export default ChatPage;