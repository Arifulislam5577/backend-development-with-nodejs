import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();

app.use(express.json());
//ROUTES
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", authRouter);

// GLOBAL ERROR HANDLER

app.use((error, req, res, next) => {
  return res.status(500).json({ message: "Internal Server Error" });
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
