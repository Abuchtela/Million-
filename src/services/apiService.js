import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

const getQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

const submitScore = async (userId, score) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/scores`, { userId, score });
    return response.data;
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};

const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export default {
  getQuestions,
  submitScore,
  getLeaderboard,
};
