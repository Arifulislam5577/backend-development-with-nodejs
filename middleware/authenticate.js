import USER from "../model/USER.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorize" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await USER.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorize" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
