import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'resumes',       // folder name in Cloudinary
        resource_type: 'raw'     // required for PDF/DOC/DOCX
      },
      (error, result) => {
        if (error) reject(new Error('Cloudinary upload failed: ' + error.message));
        else resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

export const uploadBufferToCloudinary = (buffer, folder = "reviews") =>
new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
    if (err) return reject(err);
    resolve(result);
  });
  stream.end(buffer);
});