import express from "express";
import {
  login,
  logout,
  signup,
  updataProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updataProfile);
export default router;
