import mongoose from "mongoose";
import process from "process";

const connectToDatabase = async () => {
  let dbUri = "";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    dbUri = process.env.DB_LOCAL_URI;
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    dbUri = process.env.DB_URI;
  }
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to dabatase successfully");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

export default connectToDatabase;
