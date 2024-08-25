import jwt from "jsonwebtoken";
import process from "process";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyn from "./catchAsyncErrors.js";
import User from "../models/userModel.js";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyn(async (req, res, next) => {
  const { ACCESS_TOKEN: token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(id);
  next();
});

// Authorize user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req?.user?.role)) {
      return next(
        new ErrorHandler(
          `Role (${req?.user?.role}) is not allowed to access this resource`,
          403,
        ),
      );
    }
    next();
  };
};
