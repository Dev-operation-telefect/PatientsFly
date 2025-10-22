import User from "../../../../models/users/userModel.js";
import { hashPassword,comparePassword } from '../../../../helper/authHelper.js';
import Jwt  from "jsonwebtoken";
import { uploadToCloudinary } from "../../../../middleware/multer.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    // Step 1: Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Login and password are required.",
      });
    }
    // Step 2: Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Step 3: Check if password exists (handle Google or social login accounts)
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "No password set for this account. Try social login.",
      });
    }

    // Step 4: Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
      });
    }

     // check if user is verified
    if( !user.isVerified ){
      return res.json({
        success: false,
        message: "Please verify your email first"
      })
    }

    // Step 5: Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Step 6: Generate JWT token
    const token = Jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Step 7: Return user data safely (no password)
    res.status(200).json({
      success: true,
      message: "Login successful.",
      expiresIn: 604800, // 7 days in seconds
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        gender: user.gender,
        dob: user.dob,
        role: user.role,
        isActive: user.isActive,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


//update profile information
export const updateProfileInformationController = async (req, res) => {
   try {
    const { password, ...updateFields } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update all other fields
    Object.keys(updateFields).forEach((key) => {
      if (typeof updateFields[key] === "object" && updateFields[key] !== null) {
        // nested fields (e.g., address)
        Object.keys(updateFields[key]).forEach((subKey) => {
          user[key][subKey] = updateFields[key][subKey];
        });
      } else {
        user[key] = updateFields[key];
      }
    });

    // Update password if provided
    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
    }

    await user.save();

    // Remove sensitive info before sending back
    const { password: _, ...userData } = user.toObject();

    res.json({ updatedUser: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// profile pic update update Profile Pic Controller
// Controller for updating profile picture
export const updateProfilePicController =  async (req, res) => {
   try {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Update user document
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};


// Update Profile (without image)
export const updateProfile = async (req, res) => {
  try {
    const { fullName, username, email, phone, dob, gender, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;
    user.address = address || user.address;

    const updatedUser = await user.save();
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const roleToggleCanPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = user.role === "admin" ? "superAdmin" : "admin";
    await user.save();
    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminProfileInformationController = async (req, res) => {
  console.log(req.body); 
  try {
    const { password, ...updateFields } = req.body;
    const user = await User.findById(updateFields.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user fields, including nested address
    Object.keys(updateFields).forEach((key) => {
      if (key === 'address') {
        Object.keys(updateFields[key]).forEach((subKey) => {
          user.address[subKey] = updateFields[key][subKey];
        });
      } else {
        user[key] = updateFields[key];
      }
    });

    // Update password if provided
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
    }

    await user.save();

    // Exclude password from response for security
    const { password: _, ...userData } = user.toObject();

    res.json({ updatedUser: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for updating profile picture
export const updateAdminProfilePicController =  async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Update user document
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Admin Profile picture updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
