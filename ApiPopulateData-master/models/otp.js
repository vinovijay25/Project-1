const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true
  },
  mobile_or_email: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 600 // expire after 5 minutes
  }
});

const OtpModel = mongoose.model('Otp', otpSchema);

module.exports = OtpModel;
