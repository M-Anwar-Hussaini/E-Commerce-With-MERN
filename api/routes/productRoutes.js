import express from "express";
import {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);
router
  .route("/products/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/admin/products").post(newProduct);

export default router;
