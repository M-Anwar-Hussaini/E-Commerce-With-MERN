import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"; // Import your User model
import process from "process";
import dotenv from "dotenv";

dotenv.config({ path: "config/config.env" });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI);
    
    await Product.deleteMany();
    console.log("Products are deleted");

    // Fetch a user from the database to use as the 'user' field in products
    const user = await User.findOne(); // Get the first user from the database
    if (!user) {
      throw new Error("No users found in the database");
    }

    const productsWithUser = products.map(product => ({
      ...product,
      user: user._id, // Assign the user ID to each product
    }));

    await Product.insertMany(productsWithUser);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedProducts();
