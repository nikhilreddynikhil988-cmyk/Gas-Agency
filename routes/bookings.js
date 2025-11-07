const express = require('express');
const {
  createBooking,
  getMyBookings,
} = require('../controllers/bookings');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/').post(protect, createBooking).get(protect, getMyBookings);

module.exports = router;
