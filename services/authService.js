import USER from "../model/USER.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupService = (key, value) => {
  if (key === "_id") {
    return USER.findById(key);
  } else {
    return USER.findOne({ [key]: value });
  }
};

export const createUser = ({ name, email, password }) => {
  const user = new USER({ name, email, password });
  return user.save();
};

export const loginService = async ({ user, password }) => {
  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return token;
  }
};
