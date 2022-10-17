import { products } from "../utils/data.js";

export const getProducts = async (req, res, next) => {
  res.json({
    status: 200,
    products,
  });
};
