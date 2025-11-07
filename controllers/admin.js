const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Notice = require('../models/Notice');

// @desc      Get all users
// @route     GET /api/v1/admin/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc      Update user
// @route     PUT /api/v1/admin/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// @desc      Delete user
// @route     DELETE /api/v1/admin/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get all bookings
// @route     GET /api/v1/admin/bookings
// @access    Private/Admin
exports.getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find().populate('user', 'name email');
  res.status(200).json({ success: true, count: bookings.length, data: bookings });
});

// @desc      Update booking
// @route     PUT /api/v1/admin/bookings/:id
// @access    Private/Admin
exports.updateBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: booking });
});

// @desc      Create notice
// @route     POST /api/v1/admin/notices
// @access    Private/Admin
exports.createNotice = asyncHandler(async (req, res, next) => {
  const notice = await Notice.create(req.body);
  res.status(201).json({ success: true, data: notice });
});

// @desc      Get all notices
// @route     GET /api/v1/admin/notices
// @access    Private/Admin
exports.getNotices = asyncHandler(async (req, res, next) => {
  const notices = await Notice.find();
  res.status(200).json({ success: true, count: notices.length, data: notices });
});