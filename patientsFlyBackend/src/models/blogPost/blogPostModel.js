import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // Blog title
        slug: { type: String, required: true, unique: true }, // URL-friendly slug
        content: { type: String, required: true }, // Blog content
        teamMember: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        }, // Reference to TeamMember
        published: { type: Boolean, default: false },
        publishedAt: { type: Date, default: Date.now },
        tags: [{ type: String }],
        seo: {
            metaTitle: { type: String },
            metaDescription: { type: String },
            metaKeywords: [{ type: String }]
        },
        images: [{ type: String }], 
        // post approve by admin
        isApproved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
