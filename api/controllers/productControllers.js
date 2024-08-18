import Product from "../models/productModel.js";

// Create new product => /api/v1/products
export const getProducts = (req, res) => {
  res.status(200).json({
    message: "All products",
  });
};

// Cretae new product => /api/v1/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    product,
  });
}
