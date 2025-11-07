const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'delivered'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Paytm QR'],
    required: true,
  },
  isExtra: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
