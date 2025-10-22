import mongoose from "mongoose";

const teammateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String },
    phone: { type: String },
    joiningDate: { type: Date },
    skills: [{ type: String }],
    photo: { type: String },
    addedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Teammate", teammateSchema);
