import express from "express";
import { createBlogPost, getApprovedBlogs, getAllBlogs, approveBlog, updateBlog, deleteBlog,toggleApproval, getAllBlogsByTeamMember, getBlogBySlug } from "../../controller/blogPost/blogController.js";
import upload from "../../middleware/multer.js";
import {ExtremeRequestSignIn } from "../../middleware/userExtremeMiddleware.js";

const router = express.Router();

// Admin
router.get("/blogs", getAllBlogs);

// Public
router.get("/", getApprovedBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/team/:teamMember", getAllBlogsByTeamMember);
router.put("/approve/:id", ExtremeRequestSignIn, approveBlog);

// User & Admin
router.post("/", upload.array("images", 5), createBlogPost);
router.put("/:id", ExtremeRequestSignIn, upload.array("images", 5), updateBlog);
router.delete("/:id", ExtremeRequestSignIn, deleteBlog);

// Toggle approval route
router.patch("/:id/toggle-approval", ExtremeRequestSignIn, toggleApproval);

export default router;
