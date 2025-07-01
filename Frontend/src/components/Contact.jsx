import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      message,
      name: user?.fname || "Anonymous",
      email: user?.email || "",
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/feedback`,
        payload
      );
      setSuccess("✅ Thank you for your feedback!");
      setMessage("");
    } catch (err) {
      setSuccess("❌ Error submitting feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-10">
      <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-white dark:bg-slate-800 dark:text-white transition-all duration-300">
        <h2 className="text-3xl font-bold mb-2 text-center">
          We Value Your Feedback 💬
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Your thoughts help us grow and improve! Whether you're a guest or a
          regular customer, please share your experience with us.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="5"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-slate-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="flex justify-between mt-4">
            <Link
              to="/"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
              Back
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
          {success && (
            <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400 text-center">
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;

