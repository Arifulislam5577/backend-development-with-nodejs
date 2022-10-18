import PRODUCT from "../model/PRODUCT.js";
import { uplaodImg } from "../services/productService.js";
import { products } from "../utils/data.js";

export const getProducts = async (req, res, next) => {
  res.json({
    status: 200,
    products,
  });
};

export const createProduct = async (req, res, next) => {
  const { title, price, image } = req.body;

  console.log(req.body);

  try {
    const imgUrl = await uplaodImg(image);
    const product = new PRODUCT({
      title,
      price,
      image: imgUrl,
    });

    await product.save();

    res.status(201).json({ message: "product saved successfully" });
  } catch (error) {
    next(error);
  }
};
