import sendForgotVerificationEmail from "../../../../services/sendForgotVerificationEmail/sendForgotVerificationEmail.js";
import User from "../../../../models/users/userModel.js";
import { hashPassword,comparePassword } from '../../../../helper/authHelper.js';


// Generate 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// Request OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" }); 

    const otp = generateOTP();

    user.otp = {
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    };
    
    await user.save(); // Corrected: save the user instance

    sendForgotVerificationEmail(email, otp); // Optional: await if this returns a promise

    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword, password } = req.body; // Accept both
  const finalPassword = newPassword || password; // Use whichever is present
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp || user.otp.code !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (!finalPassword || finalPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await hashPassword(finalPassword);
    user.password = hashedPassword;
    user.otp = null;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
