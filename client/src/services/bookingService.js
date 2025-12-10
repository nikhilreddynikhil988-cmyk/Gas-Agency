import axios from 'axios';
import authHeader from './auth-header';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/v1/bookings`;

const getMyBookings = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createBooking = (bookingData) => {
  return axios.post(API_URL, bookingData, { headers: authHeader() });
};

const bookingService = {
  getMyBookings,
  createBooking,
};

export default bookingService;
