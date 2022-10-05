import { products } from "../utils/data.js";

export const getProducts = async (req, res, next) => {
  console.log(req.user);
  res.json({
    status: 200,
    products,
  });
};
