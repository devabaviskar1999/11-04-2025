import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorization - No Token Provided!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorization - No Token Provided!" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protection middleware", err.message);
    return res.status(500).json({ err: "Internal server error" });
  }
};
