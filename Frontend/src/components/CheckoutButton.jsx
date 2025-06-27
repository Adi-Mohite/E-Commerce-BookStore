import React from "react";
import axios from "axios";
import { useCart } from "./CartProvider";
import { useAuth } from "./context/AuthProvider";
import toast from "react-hot-toast";

const CheckoutButton = ({ amount }) => {
  const { cart, clearCart } = useCart();
  const {authUser} = useAuth();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      alert("Razorpay Key ID is missing. Check your .env setup.");
      return;
    }

    if (!authUser || !authUser._id) {
      alert("You must be logged in to make a payment");
      return;
    }

 
    const { data } = await axios.post("http://localhost:4001/api/order", {
      amount,
      items: cart,
      userId: authUser._id,
    });

    const options = {
      key,
      amount: data.order.amount,
      currency: "INR",
      name: "Book Store",
      description: "Test Payment",
      order_id: data.order.id,
      handler: async function (response) {
        
        try {
          const verifyRes = await axios.post("http://localhost:4001/admin/order/verify-payment", {
            orderId: data.order.id,
            paymentId: response.razorpay_payment_id,
          });

          console.log("✅ Payment verified:", verifyRes.data);
          toast.success("Payment SuccessFul")
          clearCart();
          window.dispatchEvent(new Event("sales-data-updated"));

        } catch (err) {
          console.error("❌ Payment verification failed:", err);
          toast.error("Payment Failed")
        }
      },
      prefill: {
        name: authUser.name || "Test User",
        email: authUser.email || "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 duration-300"
      onClick={handlePayment}
    >
      Pay ₹{amount}
    </button>
  );
};

export default CheckoutButton;
