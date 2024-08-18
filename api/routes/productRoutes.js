import express from "express";
import {
  getProducts,
  newProduct,
  getProductDetails,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/admin/products").post(newProduct);

export default router;
