// src/components/Chat.js
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_MESSAGES, ADD_MESSAGE } from "../queries";

const Chat = ({ username }) => {
  const [newMessage, setNewMessage] = useState("");

  const { loading, error, data } = useQuery(GET_USER_MESSAGES, {
    variables: { username },
  });

  const [addMessage] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      cache.modify({
        fields: {
          user(existingUserData = {}) {
            const updatedMessages = [...(existingUserData.messages || []), addMessage];
            return { ...existingUserData, messages: updatedMessages };
          }
        }
      });
    },
  });

  if (loading) return <p>Mesajlar yükleniyor...</p>;
  if (error) return <p>Hata: {error.message}</p>;

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await addMessage({
        variables: {
          content: newMessage,
          sender: "user",
          userId: data.user.id,
        },
      });
      setNewMessage("");
    } catch (err) {
      console.error("Mesaj gönderilemedi:", err);
    }
  };

  return (
    <div>
      <h2>{data.user.username} ile Sohbet</h2>
      <div>
        {data.user.messages.map((msg) => (
          <div key={msg.id} style={{ margin: "10px 0" }}>
            <strong>{msg.sender === "user" ? "Sen" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Mesaj yazın..."
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage} disabled={!newMessage.trim()}>Gönder</button>
    </div>
  );
};

export default Chat;
