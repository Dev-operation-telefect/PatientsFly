import express from "express";
import { register, verifyEmail } from "../../controller/users/authentication/registration/authController.js";
import { loginController,updateProfilePicController,updateProfileInformationController, updateProfile, roleToggleCanPost, updateAdminProfileInformationController, updateAdminProfilePicController, getUserById} from "../../controller/users/authentication/login/loginController.js";
import { forgotPassword,resetPassword} from "../../controller/users/authentication/forgot/forgotController.js";
import { requestSignIn,isAdmin,isSuperAdmin} from "../../middleware/authMiddleware.js";
import upload from '../../middleware/multer.js';
import { deleteUser, getAllUsers, toggleBlockUser, toggleCanPost, } from "../../controller/users/adminUser/adminUserController.js";
import {ExtremeRequestSignIn}  from "../../middleware/userExtremeMiddleware.js";

const router = express.Router();

// registration || method post
router.post("/register", register);
router.post("/verify-email", verifyEmail);

// login || method post
router.post("/login", loginController)

// forgot password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); 

// protected user route auth
router.get("/user-auth",requestSignIn,(req,res)=>{
    res.send({ok:true})
})

// protected admin route auth
router.get("/admin-auth",requestSignIn,isAdmin,(req,res)=>{
    res.send({ok:true})
})

// protected Super Admin route auth
router.get("/admin-superadmin",requestSignIn,isSuperAdmin,(req,res)=>{
    res.send({ok:true})
})

//update profile information
router.put("/profile-info",requestSignIn, updateProfileInformationController);

// PUT /api/v1/auth/profile-pic/:id
router.put("/profile-pic/:id", upload.single("profilePicture"), updateProfilePicController);
// profile information update 7-31-2025
router.put("/profile", requestSignIn, updateProfile);

// Admin-only routes
router.get("/", getAllUsers);
router.delete("/:id", ExtremeRequestSignIn, deleteUser);
router.patch("/:id/block", ExtremeRequestSignIn, toggleBlockUser);
router.patch("/:id/can-post", ExtremeRequestSignIn, toggleCanPost);
router.put("/role/:id", ExtremeRequestSignIn, roleToggleCanPost);

// Admin update profile
router.put("/admin-update-profile",ExtremeRequestSignIn,  updateAdminProfileInformationController);
router.put("/admin-update-profile-pic/:id", upload.single("profileImage"),ExtremeRequestSignIn, updateAdminProfilePicController);
// Single user by ID
router.get("/:id", ExtremeRequestSignIn, getUserById);

export default router;
// Export the router to be used in the main app file
// export default router;