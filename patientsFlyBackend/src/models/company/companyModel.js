// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        tagline: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          lowercase: true,
        },
        phone: {
          type: String,
        },
        website: {
          type: String,
        },
        address: {
          country: { type: String },
          state: { type: String },
          city: { type: String },
          street: { type: String },
          postalCode: { type: String },
        },
        logo: {
          type: String, // Cloudinary / local path
        },
        socialLinks: {
          facebook: { type: String },
          twitter: { type: String },
          linkedin: { type: String },
          instagram: { type: String },
          youtube: { type: String },
        },
        singleton: { type: String, default: "ONLY", unique: true },
    },
    { timestamps: true }
);

export default mongoose.model("Company", companySchema);
