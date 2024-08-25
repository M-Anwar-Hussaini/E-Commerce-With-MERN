import express from "express";
import {
  forgetPassword,
  loginUser,
  logout,
  registerUser,
  resetPassword,
} from "../controllers/authControllers.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
