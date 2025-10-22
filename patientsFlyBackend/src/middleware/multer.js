import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';
import path from 'path';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage to store files in memory (not on disk)
const upload = multer({
    storage: multer.memoryStorage(), // Store file buffer in memory
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.PNG') {
            cb(new Error('File type is not supported'), false);
            return;
        }
        cb(null, true);
    }
});

// Cloudinary upload function (uploads the file directly to Cloudinary from memory)
export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
            { resource_type: 'auto', folder: 'telerism/employees' }, // Automatically detect resource type (image/video/etc.)
            (error, result) => {
                if (error) return reject(error);
                resolve(result); // Return the Cloudinary result with URL, etc.
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream); // Upload the buffer directly
    });
};

export default upload;
// Export the multer instance for use in routes






