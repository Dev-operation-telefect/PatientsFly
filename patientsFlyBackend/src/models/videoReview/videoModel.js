// models/Video.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    thumbnail: { type: String, required: true },
    userImage: { type: String },
    userName: { type: String, required: true },
    userLocation: { type: String },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Video', VideoSchema);
