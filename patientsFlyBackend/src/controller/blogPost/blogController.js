import BlogPost from "../../models/blogPost/blogPostModel.js";
import cloudinary from "../../config/cloudinary.js";
import slugify from 'slugify';
import User from "../../models/users/userModel.js";
// Upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "projects" }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
    stream.end(file.buffer);
  });
};
// Create Blog Post
export const createBlogPost = async (req, res) => {
    try {
        const { title, content, tags, seo, teamMember } = req.body;
        //who is creating the blog check User canPost
        const user = await User.findById(teamMember);
        if (!user.canPost) {
            return res.status(403).json({ message: "You are not allowed to create a blog post" });
        }
        if (!teamMember) {
            return res.status(400).json({ message: "Team member is required" });
        } 
        // Validate max 5 images
        if (req.files && req.files.length > 5) {
            return res.status(400).json({ message: "You can upload a maximum of 5 images" });
        }
        const imageUrls = [];
        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            const imageUrl = await uploadToCloudinary(file);
            imageUrls.push(imageUrl);
          }
        }
        const newBlog = await BlogPost.create({
            title,
            slug: slugify(title, { lower: true }),
            content,
            teamMember,
            tags,
            seo,
            images: imageUrls,
            isApproved: false // Needs admin approval
        });

        res.status(201).json({ message: "Blog created successfully, pending admin approval", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Approved Blogs (Public)
export const getApprovedBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find({ isApproved: true })
        .populate("teamMember", "fullName profilePicture email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Blogs (Admin only)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find()
    .populate("teamMember", "fullName email role profilePicture") 
    .sort({ createdAt: -1 }); 
    // console.log(res);
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to fetch blogs",
        error: error.message
    });
  }
};

// get all data in who data teamMember massing those data show only
export const getAllBlogsByTeamMember = async (req, res) => {
    try {
        const { teamMember } = req.params;
        const blogs = await BlogPost.find({ teamMember })
            .populate("teamMember", "fullName email role profilePicture");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Approve Blog (Admin)
export const approveBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogPost.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.json({ message: "Blog approved successfully", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Blog (User can update own blog if not approved, Admin can update any)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Authorization: Admin OR blog owner (if blog not yet approved)
    if (
      req.user.role !== "admin" &&
      (blog.teamMember.toString() !== req.user._id.toString() || blog.isApproved)
    ) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    const { title, content, tags, seo } = req.body;

    // Handle image upload
    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({ message: "You can upload a maximum of 5 images" });
      }

      const uploadedImages = [];
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file);
        uploadedImages.push(imageUrl);
      }
      blog.images = uploadedImages; // Replace old images
    }

    // Update fields
    if (title) {
      blog.title = title;
      blog.slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });
    }
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.seo = seo || blog.seo;

    await blog.save();

    res.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Blog (Admin or blog owner)
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogPost.findById(id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (req.user.role !== "admin" && blog.teamMember.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this blog" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 
export const toggleApproval = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.isApproved = !blog.isApproved;
    await blog.save();

    res.json({ message: "Blog approval status updated", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle approval" });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const blog = await BlogPost.findOne({ slug })
      .populate("teamMember", "fullName profilePicture email")
      .lean();

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("getBlogBySlug error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
