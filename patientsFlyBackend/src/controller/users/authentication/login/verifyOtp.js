import User from "../../../../models/users/userModel.js";
import jwt from "jsonwebtoken";

export const verifyOtp = async (req, res) => {
  try {
    const { loginInput, otp } = req.body;

    const user = await User.findOne({
      $or: [{ email: loginInput }, { username: loginInput }, { phone: loginInput }]
    });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.otpCode !== otp || new Date() > new Date(user.otpExpires)) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // OTP is valid - clear it
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    // Generate login token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
