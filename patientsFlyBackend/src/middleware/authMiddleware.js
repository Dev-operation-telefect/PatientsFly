import Jwt from "jsonwebtoken";
import User from "../models/users/userModel.js";

// 🛡️ General token check middleware
export const requestSignIn = async (req, res, next) => {
  try {
    const decoded = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};


export const requestSignInNext = async (req, res, next) => {
  try {
    // Split "Bearer <token>" and get the token part
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    const token = authHeader.split(' ')[1];
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

// 🛡️ Admin access middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin" && user.role !== "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admins only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in admin middleware",
      error: error.message,
    });
  }
};

// 🛡️ SuperAdmin access middleware
export const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Super Admins only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in superAdmin middleware",
      error: error.message,
    });
  }
};
