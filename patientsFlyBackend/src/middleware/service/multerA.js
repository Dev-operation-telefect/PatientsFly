import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary";


// Create Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "services", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer Middleware
const upload = multer({ storage });

export default upload;
