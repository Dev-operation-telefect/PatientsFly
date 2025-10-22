import jwt from "jsonwebtoken";
import Admin from "../models/admin/adminModel.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "You Have No token please Login" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);
        next();
    } catch {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
