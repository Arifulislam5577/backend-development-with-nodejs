import mongoose from "mongoose";

const { model, Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const PRODUCT = model("product", productSchema);

export default PRODUCT;
