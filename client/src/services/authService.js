import axios from 'axios';

// Use REACT_APP_API_URL set in the hosting environment (Vercel). Fallback to localhost for local dev.
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/v1/auth`;

const register = (name, email, password) => {
  return axios
    .post(API_URL + '/register', {
      name,
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + '/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getMe = (token) => {
  return axios.get(API_URL + '/me', { headers: { Authorization: `Bearer ${token}` } });
};

const authService = {
  register,
  login,
  logout,
  getMe,
};

export default authService;
