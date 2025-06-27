import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!user || user.role !== "admin") {
      setError("Access Denied: Only Admin can view orders.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:4001/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:4001/admin/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      alert("✅ Order status updated.");
    } catch (err) {
      console.error("❌ Failed to update status:", err);
      alert("❌ Failed to update order status.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel/delete this order?"))
      return;

    try {
      await axios.delete(`http://localhost:4001/admin/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      alert("✅ Order deleted.");
    } catch (err) {
      console.error("❌ Failed to delete order:", err);
      alert("❌ Failed to delete order.");
    }
  };

  if (loading)
    return (
      <div className="p-4 text-gray-800 dark:text-white">Loading orders...</div>
    );

  if (error)
    return (
      <div className="p-4 text-red-600 dark:text-red-400 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex justify-center items-center text-gray-800 dark:text-white">
        📦 Orders Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-left">
              <th className="p-2 border dark:border-gray-600">Order ID</th>
              <th className="p-2 border dark:border-gray-600">User</th>
              <th className="p-2 border dark:border-gray-600">Amount</th>
              <th className="p-2 border dark:border-gray-600">Payment</th>
              <th className="p-2 border dark:border-gray-600">Date</th>
              <th className="p-2 border dark:border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white break-words">
                  {order._id}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {order.user.fname}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  ₹ {order.totalAmount}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {order.paymentStatus}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border dark:border-gray-600">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value)
                    }
                    className="border dark:border-gray-600 px-2 py-1 mr-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
