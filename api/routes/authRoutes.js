import express from "express";
import {
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUserDetails,
  getUserProfile,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
  uploadAvatar,
} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/upload_avatar").put(isAuthenticatedUser, uploadAvatar);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default router;
