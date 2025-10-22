import jwt from "jsonwebtoken";
import User from "../models/users/userModel.js";

export const requestSignInY = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // ✅ Now req.user is available
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
