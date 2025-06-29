import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${API}/api/feedback`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        📝 User Feedback
      </h2>

      {feedbacks.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          No feedback available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md 
                         bg-white dark:bg-slate-800 p-5 hover:scale-[1.02] transition-transform"
            >
              <p className="mb-2 text-gray-800 dark:text-white">
                <strong>User:</strong>{" "}
                {fb.user
                  ? `${fb.user.name} (${fb.user.email})`
                  : fb.name || "Anonymous"}
              </p>

              <p className="mb-3 text-gray-700 dark:text-gray-300">
                <strong>Message:</strong> {fb.message}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted:{" "}
                {fb.submittedAt
                  ? new Date(fb.submittedAt).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;


