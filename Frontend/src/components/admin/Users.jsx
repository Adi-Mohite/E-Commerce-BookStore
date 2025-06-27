import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!currentUser || !token) {
      setError("Unauthorized: User not logged in or token missing.");
      setLoading(false);
      return;
    }

    if (currentUser.role !== "admin") {
      setError("Access Denied: You are not an admin.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:4001/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(
        "❌ Failed to fetch users:",
        err.response?.data || err.message
      );
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteToAdmin = async (userId) => {
    try {
      await axios.put(
        `http://localhost:4001/admin/users/${userId}/role`,
        { role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: "admin" } : u))
      );
      alert("✅ User promoted to admin.");
    } catch (err) {
      console.error(
        "❌ Promote to admin error:",
        err.response?.data || err.message
      );
      alert("❌ Failed to promote user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (String(userId) === String(currentUser?._id)) {
      alert("⚠️ You cannot delete yourself.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:4001/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      alert("✅ User deleted successfully.");
    } catch (err) {
      console.error(
        "❌ Failed to delete user:",
        err.response?.data || err.message
      );
      alert("❌ Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 text-gray-800 dark:text-white">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
         All Users
      </h2>

      
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name"
          className="border dark:border-gray-600 p-2 rounded-md 
                     w-full sm:w-2/3 md:w-1/3 
                     bg-white dark:bg-gray-800 
                     text-gray-800 dark:text-white outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

  
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border dark:border-gray-600 text-left">
                Name
              </th>
              <th className="p-2 border dark:border-gray-600 text-left">
                Email
              </th>
              <th className="p-2 border dark:border-gray-600 text-left">
                Role
              </th>
              <th className="p-2 border dark:border-gray-600 text-left">
                User ID
              </th>
              <th className="p-2 border dark:border-gray-600 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {user.fname}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {user.email}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {user.role}
                </td>
                <td className="p-2 border dark:border-gray-600 text-gray-800 dark:text-white">
                  {user._id}
                </td>
                <td className="p-2 border dark:border-gray-600">
                  {String(user._id) !== String(currentUser?._id) ? (
                    <>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handlePromoteToAdmin(user._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2"
                        >
                          Promote
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      You
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
