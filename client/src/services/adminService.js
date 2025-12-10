import axios from 'axios';
import authHeader from './auth-header';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/v1/admin`;

const getUsers = () => {
  return axios.get(API_URL + '/users', { headers: authHeader() });
};

const getBookings = () => {
  return axios.get(API_URL + '/bookings', { headers: authHeader() });
};

const updateBooking = (id, status) => {
  return axios.put(API_URL + `/bookings/${id}`, status, { headers: authHeader() });
};

const getNotices = () => {
  return axios.get(API_URL + '/notices', { headers: authHeader() });
};

const createNotice = (noticeData) => {
  return axios.post(API_URL + '/notices', noticeData, { headers: authHeader() });
};

const adminService = {
  getUsers,
  getBookings,
  updateBooking,
  getNotices,
  createNotice,
};

export default adminService;
