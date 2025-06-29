import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

const API = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API}/user/login`, {
        email: data.email,
        password: data.password,
      });

      const { token, user } = res.data;
      const fixedUser = {
        _id: user._id || user.id,
        fname: user.fname,
        email: user.email,
        role: user.role || "user",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(fixedUser));
      setAuthUser(fixedUser);

      if (fixedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Logged In Successfully");
      document.getElementById("my_modal_3")?.close();
    } catch (err) {
      toast.error(
        "Login failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-800 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="m-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 px-3 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div className="m-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full py-2 px-3 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            <div className="m-4 flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
              <p className="text-sm">
                Not Registered?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 underline"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  Sign-up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;

