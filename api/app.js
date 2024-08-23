import express from "express";
import dotenv from "dotenv";
import process from "process";
import productRoutes from "./routes/productRoutes.js";
import connectToDatabase from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

// Hanlde the uncaught exception errors
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Intial configurations
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(cookieParser());

// Defining the routes:
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

// Middleware to handle errors
app.use(errorMiddleware);

// Running the application
const server = app.listen(process.env.PORT, () => {
  connectToDatabase();
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

// Handle Unhandled Promise Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log(
    "Shutting down the server due to the Unhandled Promise Rejection",
  );
  server.close(() => {
    process.exit(1);
  });
});
export default app;
