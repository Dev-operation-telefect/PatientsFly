import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    address: { type: String, trim: true },

    profilePic: { type: String, trim: true }, // Cloudinary URL
    image: { type: String, trim: true },      // Optional secondary image

    text: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    optionalText: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
