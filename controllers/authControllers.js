import USER from "../model/USER.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  loginService,
  signupService,
} from "../services/authService.js";
import { generateError } from "../utils/generateError.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    signupService;
    let user = await signupService("email", email);

    if (user) {
      throw generateError("Email already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = await createUser({ name, email, password: hashPassword });

    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await signupService("email", email);
    if (!user) throw generateError("Invalid email or password", 400);
    const token = await loginService({ user, password });
    return res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    next(error);
  }
};
