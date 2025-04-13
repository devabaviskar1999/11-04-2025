import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All credentials required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const findUserByEmail = await User.findOne({ email });
    if (findUserByEmail) {
      return res
        .status(400)
        .json({ message: "User already exist in database" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ email, password: hashedPassword, fullName });
      if (newUser) {
        //!generate jwt token here
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic._id,
        });
      }
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ err: "Something went wrong while: SIGNUP" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials!" });
      } else {
        generateToken(user._id, res);
        res.status(201).json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
        });
      }
    }
  } catch (err) {
    console.error("Login error", err.message);
    return res.status(500).json({ err: "Something went wrong while: LOGIN" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("JWT", "", {
      maxAge: 0,
      httpOnly: true, //!prevent xss attacks
      sameSite: "strict", //!csrf attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV != "development",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Login error", err.message);
    return res.status(500).json({ err: "Something went wrong while: LOGIN" });
  }
};
