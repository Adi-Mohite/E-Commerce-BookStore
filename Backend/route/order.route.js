import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  verifyPayment,
} from "../controller/order.controller.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();


router.get("/orders", authenticateToken, requireAdmin, getAllOrders);
router.get("/orders/:id", authenticateToken, requireAdmin, getOrderById);
router.put("/orders/:id/status", authenticateToken, requireAdmin, updateOrderStatus);
router.delete("/orders/:id", authenticateToken, requireAdmin, deleteOrder);
router.post("/order/verify-payment", verifyPayment);


export default router;
