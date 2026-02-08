import axios from 'axios';

// Use REACT_APP_API_URL set in the hosting environment (Vercel). Fallback to localhost for local dev.
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/v1/auth`;

const register = (name, email, password, role) => {
  const existing = JSON.parse(localStorage.getItem('user'));
  const headers = existing && existing.token ? { Authorization: `Bearer ${existing.token}` } : {};
  const body = { name, email, password };
  if (role) body.role = role;

  return axios.post(API_URL + '/register', body, { headers }).then((response) => {
    // If there's already a logged-in user (e.g., admin creating a new admin),
    // do not overwrite the current stored user token. Only store when no existing user.
    if (!existing && response.data.token) {
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
