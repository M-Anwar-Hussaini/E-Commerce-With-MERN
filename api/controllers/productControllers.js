import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchcAsync from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import Order from "../models/orderModel.js";
import {upload_file} from "../utils/cloudinary.js";

// Get all products => /api/v1/products
export const getProducts = catchcAsync(async (req, res) => {
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// Cretae new product => /api/v1/admin/products
export const newProduct = catchcAsync(async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    product,
  });
});

// Get single product details => /api/v1/products/:id
export const getProductDetails = catchcAsync(async (req, res, next) => {
  const product = await Product.findById(req.params?.id).populate(
    "reviews.user"
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    product,
  });
});

// Get Products- ADMIN => /api/v1/admin/products
export const getAdminProducts = catchcAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});

// Update product details => /api/v1/products/:id
export const updateProduct = catchcAsync(async (req, res, next) => {
  let product = await Product.findById(req.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    product,
  });
});

// Upload product images   =>  /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchcAsync(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const uploader = async (image) => upload_file(image, "shopit/products");

  const urls = await Promise.all((req?.body?.images).map(uploader));

  product?.images?.push(...urls);
  await product?.save();

  res.status(200).json({
    product,
  });
});

// Delete product => /api/v1/products/:id
export const deleteProduct = catchcAsync(async (req, res, next) => {
  const product = await Product.findById(req.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

// Create/Update product review => /api/v1/review
export const createProductReview = catchcAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product?.reviews?.forEach((review) => {
      if (review.user.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product?.reviews?.length;
  }

  product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product?.reviews?.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get product reviews => /api/v1/reviews
export const getProductReviews = catchcAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// Delete product review   =>  /api/v1/admin/reviews
export const deleteReview = catchcAsync(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

// Can user review   =>  /api/v1/can_review
export const canUserReview = catchcAsync(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  });

  if (orders.length === 0) {
    return res.status(200).json({ canReview: false });
  }

  // Check if the user has already reviewed the product
  const product = await Product.findById(req.query.productId);
  const isReviewed = product?.reviews?.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    return res.status(200).json({ canReview: false });
  }

  res.status(200).json({
    canReview: true,
  });
});
