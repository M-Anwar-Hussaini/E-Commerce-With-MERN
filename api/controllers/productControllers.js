import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchcAsync from '../middlewares/catchAsyncErrors.js';

// Create new product => /api/v1/products
export const getProducts = catchcAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});

// Cretae new product => /api/v1/admin/products
export const newProduct = catchcAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
});

// Get single product details => /api/v1/products/:id
export const getProductDetails = catchcAsync(async (req, res, next) => {
  const product = await Product.findById(req.params?.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    product,
  });
});

// Update product details => /api/v1/products/:id
export const updateProduct = catchcAsync(async (req, res, next) => {
  let product = await Product.findById(req.params?.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    product,
  });
});

// Delete product => /api/v1/products/:id
export const deleteProduct = catchcAsync(async (req, res, next) => {
  const product = await Product.findById(req.params?.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: 'Product deleted successfully',
  });
});
