import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import Order from "../model/order.model.js";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


router.post("/order/verify-payment", async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId || !paymentId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or paymentId" });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status: "paid" },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Payment verified and order updated",
      order,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/order", async (req, res) => {
  try {
    const { amount, items, userId } = req.body;

    if (!amount || !items || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    
    const parsedAmount = Math.round(parseFloat(amount) * 100);

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: parsedAmount, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const sanitizedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    const savedOrder = await Order.create({
      user: userId,
      orderId: razorpayOrder.id,
      items: sanitizedItems,
      totalAmount: parseFloat(amount),
      status: "created",
    });

    res.json({
      success: true,
      order: razorpayOrder,
      savedOrder,
    });
  } catch (err) {
    console.error("Error in creating Razorpay order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
