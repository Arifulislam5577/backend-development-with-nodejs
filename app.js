import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
const app = express();

import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ALL ROUTES
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", authRouter);

app.post("/upload", async (req, res, next) => {
  try {
    const { height, width, src } = req.body;
    const folder = "/testing";
    const imageConfig = {
      height,
      width,
      folder,
      crop: "fit",
      quality: 80,
    };

    const imgObj = await cloudinary.uploader.upload(src, imageConfig);

    res.status(200).json({ success: true, imgObj });
  } catch (error) {
    next(error);
  }
});

// GLOBAL ERROR HANDLER

app.use((error, req, res, next) => {
  const status = error.status ? error.status : 500;
  const message = error.message ? error.message : "Internal Server Error";
  return res.status(status).json({ message });
});

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connect to database");
});

//APP LISTENER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
