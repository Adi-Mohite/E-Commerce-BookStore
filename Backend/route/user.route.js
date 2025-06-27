import express from "express";
import {signup, login } from "../controller/user.controller.js"
import { authenticateToken } from "../middleware/auth.js";



const router = express.Router();
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
});


router.post("/signup",signup);
router.post("/login",login);

export default router;