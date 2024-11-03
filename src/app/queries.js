import React, { memo } from 'react';
import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';

const GET_CHATBOT_RESPONSES = gql`
  query GetChatbotResponses($userInput: String!) {
    chatbotResponses(where: { userQuery_contains: $userInput }) {
      id
      email  // Renamed to follow camelCase
      responseText
      title  // Renamed Geçmiş to title
      createdAt  // Renamed Hakkında to createdAt
      priority  // Renamed Ayarlar to priority
    }
  }
`;

const Chatbot = ({ userMessage }) => {
  const { loading, error, data } = useQuery(GET_CHATBOT_RESPONSES, {
    variables: { userInput: userMessage },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>; // Replace with spinner if available
  if (error) return <p>Error: {error.message}</p>;

  const responses = data?.chatbotResponses?.length
    ? data.chatbotResponses.map((resp) => (
        <div key={resp.id} style={{ marginBottom: '1em' }}>
          <h4>{resp.title}</h4>
          <p>{resp.responseText}</p>
          <small>
            <em>Created at: {new Date(resp.createdAt).toLocaleDateString()}</em>
            {resp.priority && <strong> - Priority: {resp.priority}</strong>}
          </small>
        </div>
      ))
    : <p>Üzgünüm, yanıt bulamadım.</p>;

  return <div>{responses}</div>;
};

Chatbot.propTypes = {
  userMessage: PropTypes.string.isRequired,
};

export default memoChatbot;
