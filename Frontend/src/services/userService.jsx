
import axios from 'axios';

const API_URL = 'http://localhost:5274/api/users';

const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};

const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

export default {
  login,
  register,
  getProfile,
};
