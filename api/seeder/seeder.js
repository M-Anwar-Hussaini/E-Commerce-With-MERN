import mongoose from 'mongoose';
import products from './data.js';
import Product from '../models/productModel.js';

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce-MERN");

        await Product.deleteMany();
        console.log("Products are deleted");

        await Product.insertMany(products);
        console.log("All Products are added");

        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit();
    }
}

seedProducts();
