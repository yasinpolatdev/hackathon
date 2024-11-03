// src/components/Chat.js
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_MESSAGES, ADD_MESSAGE } from "../queries";

const Chat = ({ username }) => {
  const [newMessage, setNewMessage] = useState("");
  const { loading, error, data } = useQuery(GET_USER_MESSAGES, {
    variables: { username },
  });
  const [addMessage] = useMutation(ADD_MESSAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSendMessage = async () => {
    if (!newMessage) return;
    await addMessage({
      variables: {
        content: newMessage,
        sender: "user",
        userId: data.user.id,
      },
      refetchQueries: [{ query: GET_USER_MESSAGES, variables: { username } }],
    });
    setNewMessage("");
  };

  return (
    <div>
      <h2>Chat with {data.user.username}</h2>
      <div>
        {data.user.messages.map((msg) => (
          <div key={msg.id} style={{ margin: "10px 0" }}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
