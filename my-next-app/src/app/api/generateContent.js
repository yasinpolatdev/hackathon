import axios from 'axios';

export default async function handler(req, res) {
  const { message } = req.body;

  // Replace with your Gemini API endpoint and key
  const API_URL = 'https://api.gemini.com/chatbot';
  const API_KEY = 'AIzaSyCQ2ARYWgoOgP6d65ICOdiYUrg-ySrB9MA';

  try {
    const response = await axios.post(API_URL, {
      query: message,
      key: API_KEY,
    });

    // Respond with the chatbot's response
    res.status(200).json({ message: response.data.response });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Failed to get a response from Gemini.' });
  }
}
