import express from "express";
import { getAllUsers, deleteUser, updateUserRole, getSalesStats } from "../controller/admin.controller.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", authenticateToken, requireAdmin, getAllUsers);
router.delete("/users/:id", authenticateToken, requireAdmin, deleteUser);
router.put("/users/:id/role", authenticateToken, requireAdmin, updateUserRole);
router.get("/sales", authenticateToken, requireAdmin, getSalesStats);



export default router;
