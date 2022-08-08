import { Router } from "express";
import {
  getProduct,
  addProduct,
  deleteProduct,
  getAllUserProducts,
} from "../controllers/products.js";
import { createProductId } from "../middleware/product.js";
import { checkForUser, auth } from "../middleware/user.js";

const router = Router();

router.get("/products", checkForUser, auth, getAllUserProducts);
router.post("/products/add", checkForUser, createProductId, addProduct);
router.post("/products/delete", checkForUser, deleteProduct);
router.post("/product", checkForUser, getProduct);

export default router;
