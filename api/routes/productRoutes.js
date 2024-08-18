import express from "express";
import {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails).put(updateProduct);
router.route("/admin/products").post(newProduct);

export default router;
