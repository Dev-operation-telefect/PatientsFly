import mongoose from "mongoose";

// models/User.js
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  dob: Date,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  profilePicture: { type: String, default: 'https://i.pravatar.cc/300' },
  role: { type: String, enum: ["superAdmin", "admin",], default: 'admin' },
  isVerified: { type: Boolean, default: false },
  otpCode: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
  otp: {
  code: { type: String, default: null },
  expiresAt: { type: Date, default: null },
  },
  // can post permission from admin
  canPost: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  verificationToken: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

}, { timestamps: true });

export default mongoose.model('User', userSchema);

