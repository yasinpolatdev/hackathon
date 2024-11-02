// src/App.js
import React, { useState, useEffect } from "react";
import Chat from "./components/chat";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // Kullanıcı adı yerel depolamada varsa yüklenir
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Kullanıcı adı her değiştiğinde yerel depolamaya kaydedilir
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    // Kullanıcı adı geçerliliğini kontrol et
    if (newUsername.trim() === "") {
      setError("Kullanıcı adı boş olamaz.");
    } else if (newUsername.length < 3) {
      setError("Kullanıcı adı en az 3 karakter olmalıdır.");
    } else {
      setError("");
    }
  };

  return (
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
  );
};

export default App;
