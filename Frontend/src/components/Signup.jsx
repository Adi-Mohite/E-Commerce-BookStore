import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Login from "./Login";

const API = process.env.REACT_APP_API_URL;

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API}/user/signup`, {
        fname: data.fname,
        email: data.email,
        password: data.password,
      });

      toast.success("Signup successful. Please log in.");

      navigate("/");
      setTimeout(() => {
        document.getElementById("my_modal_3")?.showModal();
      }, 100);
    } catch (err) {
      toast.error("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[400px]">
          <div className="relative shadow-2xl p-5 rounded-2xl text-black bg-white dark:bg-slate-800 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => navigate("/", { replace: true })}
              >
                ✕
              </button>

              <h3 className="font-bold text-lg mb-4">Sign Up!</h3>

              <div className="space-y-1">
                <label>Name</label>
                <input
                  type="text"
                  className="w-full py-2 px-3 border rounded outline-none"
                  {...register("fname", { required: "Name is required" })}
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm">{errors.fname.message}</p>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <label>Email</label>
                <input
                  type="email"
                  className="w-full py-2 px-3 border rounded outline-none"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <label>Password</label>
                <input
                  type="password"
                  className="w-full py-2 px-3 border rounded outline-none"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Login />
    </>
  );
};

export default Signup;

