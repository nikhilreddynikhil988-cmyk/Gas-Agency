const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Booking = require('../models/Booking');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc      Create new booking
// @route     POST /api/v1/bookings
// @access    Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const user = await User.findById(req.user.id);

  if (user.remainingBarrels === 0 && !req.body.isExtra) {
    return next(new ErrorResponse('You have no remaining barrels', 400));
  }

  const booking = await Booking.create(req.body);

  if (!req.body.isExtra) {
    user.remainingBarrels -= 1;
    await user.save();
  }

  // Send booking confirmation email
  const message = `Your booking has been created successfully. Your booking ID is ${booking._id}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Booking Confirmation',
      message,
    });
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({
    success: true,
    data: booking,
  });
});

// @desc      Get all bookings for a user
// @route     GET /api/v1/bookings
// @access    Private
exports.getMyBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});