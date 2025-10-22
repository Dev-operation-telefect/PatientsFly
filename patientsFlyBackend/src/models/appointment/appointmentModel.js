import mongoose from "mongoose";

// models/User.js
const AppointmentSchema  = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    destination: { type: String, required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Appointment', AppointmentSchema );

