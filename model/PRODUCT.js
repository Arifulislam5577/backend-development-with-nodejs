import mongoose from "mongoose";

const { model, Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
});

const PRODUCT = model("product", productSchema);

export default PRODUCT;
