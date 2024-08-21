import express from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
