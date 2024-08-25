import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import { getResetPasswordTemplate } from "../utils/emailtemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import process from "process";
import crypto from "crypto";

// Login user => post: /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter and password.", 400));
  }

  // Search for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 201, res);
});

// Register new user => post: /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendToken(user, 201, res);
});

// Logout current user => post: /api/v1/logout
export const logout = catchAsyncErrors(async (req, res) => {
  res.cookie("ACCESS_TOKEN", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    message: "Logged out",
  });
});

// Forget password => post: /api/v1/password/forget
export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  // Search for user
  const user = await User.findOne({ email: req?.body?.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email.", 404));
  }

  // Get reset password token
  const resetToken = await user?.getResetPasswordToken();
  await user.save();

  // Create reset password url
  // TODO: The url will be changed later when working with react
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;
  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });
    res.status(200).json({
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
});

// Reset password => put: /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired.",
        400,
      ),
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match.", 400));
  }
  user.password = req.body.password;
  (user.resetPasswordToken = undefined), (user.resetPasswordExpire = undefined);
  await user.save();
  sendToken(user, 200, res);
});

// Update password => PUT: /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req?.user._id).select("+password");

  // Compare the password
  const isPasswordCorrect = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
  });
});

// Get current user profile => GET: /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req?.user._id);
  res.status(200).json({
    user,
  });
});
