import express from "express";
import { getProducts } from "../controllers/productControllers.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", getProducts);

export default router;
