import USER from "../model/USER.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await USER.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    user = new USER({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();

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
    const user = await USER.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user._doc.password;
      const token = jwt.sign(user._doc, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res.status(200).json({ message: "Login Successful", token });
    }
  } catch (error) {
    next(error);
  }
};


