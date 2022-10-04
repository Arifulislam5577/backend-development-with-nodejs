import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password is too short"],
    },
  },
  { timestamps: true }
);

const USER = model("user", userSchema);

export default USER;
