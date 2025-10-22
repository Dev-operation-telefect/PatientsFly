import Review from "../../models/patientReview/patientReviewModel.js";
import { uploadBufferToCloudinary } from "../../config/cloudinary.js";

export const list = async (_req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, review });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, email, address, text, rating, optionalText, isActive } = req.body;

    let profilePicUrl = "";
    let imageUrl = "";

    if (req.files?.profilePic?.[0]?.buffer) {
      const up = await uploadBufferToCloudinary(req.files.profilePic[0].buffer, "reviews");
      profilePicUrl = up.secure_url;
    }
    if (req.files?.image?.[0]?.buffer) {
      const up2 = await uploadBufferToCloudinary(req.files.image[0].buffer, "reviews");
      imageUrl = up2.secure_url;
    }

    const review = await Review.create({
      name,
      email,
      address,
      text,
      rating: Number(rating),
      optionalText,
      isActive: isActive !== undefined ? isActive === "true" || isActive === true : true,
      profilePic: profilePicUrl,
      image: imageUrl,
    });

    res.status(201).json({ success: true, review });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, email, address, text, rating, optionalText, isActive } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (address !== undefined) updateData.address = address;
    if (text !== undefined) updateData.text = text;
    if (rating !== undefined) updateData.rating = Number(rating);
    if (optionalText !== undefined) updateData.optionalText = optionalText;
    if (isActive !== undefined) updateData.isActive = isActive === "true" || isActive === true;

    if (req.files?.profilePic?.[0]?.buffer) {
      const up = await uploadBufferToCloudinary(req.files.profilePic[0].buffer, "reviews");
      updateData.profilePic = up.secure_url;
    }
    if (req.files?.image?.[0]?.buffer) {
      const up2 = await uploadBufferToCloudinary(req.files.image[0].buffer, "reviews");
      updateData.image = up2.secure_url;
    }

    const review = await Review.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, review });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const removeAll = async (_req, res) => {
  try {
    const r = await Review.deleteMany({});
    res.json({ success: true, deleted: r.deletedCount });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
