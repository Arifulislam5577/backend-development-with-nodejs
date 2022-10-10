import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();

app.use(express.json());
app.use(cors());
//ROUTES
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", authRouter);

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
