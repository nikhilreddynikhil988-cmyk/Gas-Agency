const express = require('express');
const {
  getUsers,
  updateUser,
  deleteUser,
  getBookings,
  updateBooking,
  createNotice,
  getNotices,
} = require('../controllers/admin');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/users').get(getUsers);
router.route('/users/:id').put(updateUser).delete(deleteUser);

router.route('/bookings').get(getBookings);
router.route('/bookings/:id').put(updateBooking);

router.route('/notices').post(createNotice).get(getNotices);

module.exports = router;
