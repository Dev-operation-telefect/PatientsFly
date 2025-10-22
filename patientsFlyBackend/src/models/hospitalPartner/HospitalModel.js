import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    { _id: false }
);

const hospitalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        city: { type: String, trim: true },
        address: { type: String, trim: true },
        description: { type: String, trim: true },
        specialties: [{ type: String }],
        phone: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        website: { type: String, trim: true },
        image: imageSchema,
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
