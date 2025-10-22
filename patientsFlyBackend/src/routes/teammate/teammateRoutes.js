import express from "express";
import multer from "multer";
import { createTeammate, getTeammates, updateTeammate, deleteTeammate } from "../../controller/teammate/teammateController.js";
import cloudinary from "../../config/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload photo to Cloudinary
router.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path, { folder: "teammates" });
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

router.post("/", createTeammate);
router.get("/", getTeammates);
router.put("/:id", updateTeammate);
router.delete("/:id", deleteTeammate);

export default router;
