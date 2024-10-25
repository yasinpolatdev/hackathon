import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  // Log the request for debugging
  console.log('Received message:', message);

  // Replace with your Gemini API key
  const API_KEY = 'AIzaSyCQ2ARYWgoOgP6d65ICOdiYUrg-ySrB9MA';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateMessage?key=${API_KEY}`;

  try {
    const response = await axios.post(API_URL, {
      prompt: {
        text: message,
      },
    });

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const botResponse = response.data.candidates[0].output;
      res.status(200).json({ message: botResponse });
    } else {
      res.status(500).json({ error: 'No valid response from Gemini.' });
    }
  } catch (error) {
    console.error('Error communicating with Gemini API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get a response from Gemini.' });
  }
}
