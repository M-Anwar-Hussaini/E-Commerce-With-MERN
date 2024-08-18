import express from "express";
import { getProducts, newProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProduct);

export default router;
