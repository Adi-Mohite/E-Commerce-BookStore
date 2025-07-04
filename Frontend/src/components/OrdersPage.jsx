import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;


const OrdersPage = () => {
  const { authUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!authUser?._id) return;

        const res = await axios.get(`${API}/api/orders/${authUser._id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(
          "❌ Failed to fetch orders:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser]);

  if (!authUser) {
    return (
      <div className="text-center mt-10 text-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold">
          You must be logged in to view orders.
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-800 dark:text-white">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          🧾 My Orders
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
        >
          🛒 Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 dark:border-gray-600 
                        rounded-xl p-4 shadow-md 
                        bg-white dark:bg-slate-800"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Order ID: {order.orderId}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Status:{" "}
                    <span className="capitalize font-medium">
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-4 items-start border border-gray-200 dark:border-gray-600 
                               rounded-lg p-3 bg-gray-50 dark:bg-slate-700"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Quantity: {item.quantity} | Price: ₹{item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
