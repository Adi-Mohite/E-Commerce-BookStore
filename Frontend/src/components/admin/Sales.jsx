import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const API = import.meta.env.REACT_APP_API_URL;

const Sales = () => {
  const { authUser, token } = useAuth();
  const [salesData, setSalesData] = useState({
    daily: null,
    weekly: null,
    monthly: null,
    yearly: null,
  });
  const [loading, setLoading] = useState(true);

  const fetchSales = async (range) => {
    try {
      const res = await axios.get(`${API}/admin/sales?range=${range}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error(
        `❌ Error fetching ${range} sales:`,
        err.response?.data || err.message
      );
      return { totalRevenue: 0, orderCount: 0 };
    }
  };

  const loadSalesData = useCallback(async () => {
    try {
      setLoading(true);
      const [daily, weekly, monthly, yearly] = await Promise.all([
        fetchSales("daily"),
        fetchSales("weekly"),
        fetchSales("monthly"),
        fetchSales("yearly"),
      ]);
      setSalesData({ daily, weekly, monthly, yearly });
    } catch (error) {
      console.error("⚠️ Error loading sales data:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (authUser?.role === "admin" && token) {
      loadSalesData();
    }
  }, [authUser, token, loadSalesData]);

  useEffect(() => {
    const handleUpdate = () => {
      loadSalesData();
    };
    window.addEventListener("sales-data-updated", handleUpdate);
    return () => window.removeEventListener("sales-data-updated", handleUpdate);
  }, [loadSalesData]);

  if (!authUser || authUser.role !== "admin") {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        🚫 Access denied. Admins only.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-gray-800 dark:text-white">
        Loading sales data...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        📊 Sales Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {["daily", "weekly", "monthly", "yearly"].map((range) => (
          <div
            key={range}
            className="bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 
                       rounded-xl p-5 hover:scale-105 transition-transform"
          >
            <h3 className="font-semibold text-lg mb-3 text-sky-700 dark:text-sky-300">
              {range === "daily" && "📆 Daily"}
              {range === "weekly" && "🗓️ Weekly"}
              {range === "monthly" && "📅 Monthly"}
              {range === "yearly" && "📈 Yearly"}
            </h3>
            <p className="text-gray-800 dark:text-gray-300">
              <span className="font-semibold">Total Revenue:</span> ₹
              {salesData[range]?.totalRevenue?.toLocaleString() || 0}
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              <span className="font-semibold">Total Orders:</span>{" "}
              {salesData[range]?.orderCount || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;

