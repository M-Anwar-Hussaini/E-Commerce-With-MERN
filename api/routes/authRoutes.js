import express from "express";
import {
  forgetPassword,
  loginUser,
  logout,
  registerUser,
} from "../controllers/authControllers.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forget").post(forgetPassword);

export default router;
