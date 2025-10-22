import User from "../../../../models/users/userModel.js";
import { hashPassword,comparePassword } from '../../../../helper/authHelper.js';
import jwt from "jsonwebtoken";
import sendVerificationEmail  from "../../../../services/createAdminMail/emailService.js"; 


// Register new user with auto-selected support employee
// This function handles user registration, including validation and password hashing.
// It also assigns a support employee with the least number of users.
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Validate input
    const userExists = await User.findOne({ $or: [{ email }] });
    if (userExists) {
      return res.json({ success: false, message: "Email already taken" });
    }
    if (!fullName || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      return res.json({ success: false, message: "Full name must contain only letters and spaces" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Auto-generate username
    const baseUsername = fullName.trim().toLowerCase().replace(/\s+/g, '');
    let username = baseUsername + Math.floor(1000 + Math.random() * 9000);

    // Ensure username is unique
    while (await User.findOne({ username })) {
      username = baseUsername + Math.floor(1000 + Math.random() * 9000);
    }

    const hashedPassword = await hashPassword(password);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Create new user instance with username
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      username, // Save auto-generated username
    });

    await user.save();
    sendVerificationEmail(email, verificationToken);
    res.json({ success: true, message: "Check your email to verify account." });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Route to handle email verification
export const verifyEmail= async (req, res) => {
  try {
    // Get token from query parameters
    const { token } = req.body; 
    // Check if token is provided
    if (!token) {
      return res.status(400).send({
        success: false,
        error: 'Verification token is required'
      })
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    console.log(user)
    if (!user) {
      return res.status(400).send({
        success: false, 
        error: 'Invalid verification token' 
      });
    }
    // Update user to mark as verified
    user.isVerified = true;
    user.verificationToken = null; // Clear verification token
    await user.save();
    res.status(200).send({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
}

