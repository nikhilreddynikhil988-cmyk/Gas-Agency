const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Only allow assigning admin role when requester is an authenticated admin
  let assignedRole = 'user';
  if (role === 'admin') {
    // Expect an Authorization header with a bearer token from an admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(new ErrorResponse('Not authorized to assign admin role', 401));
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const requestingUser = await User.findById(decoded.id);
      if (!requestingUser || requestingUser.role !== 'admin') {
        return next(new ErrorResponse('Only admins can assign admin role', 403));
      }
      assignedRole = 'admin';
    } catch (err) {
      return next(new ErrorResponse('Not authorized to assign admin role', 401));
    }
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: assignedRole,
  });

  // Create token
  const token = user.getSignedJwtToken();

  // Send welcome email
  const message = `Welcome to the Gas Agency booking system, ${user.name}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Welcome to Gas Agency',
      message,
    });
  } catch (err) {
    console.log(err);
    // Do not return error, just log it. Registration should still succeed.
  }


  res.status(200).json({ success: true, token });
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
