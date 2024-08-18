import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/productModel.js";
import process from "process";
import dotenv from "dotenv";

dotenv.config({ path: "config/config.env" });
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI);
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

seedProducts();
