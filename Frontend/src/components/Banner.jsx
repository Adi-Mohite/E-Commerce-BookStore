import React from "react";
import BookCoffee from "../assets/BookCoffee.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className=" order-2 md:order-1 w:full md:w-1/2 mt-12 md:mt-32">
          <div className="space-y-12">
            <h1 className="text-4xl font-bold">
              Hello, Welcome here to learn something
              <span className="text-blue-500"> new everyday !!!</span>
            </h1>
            <p className="text-xl">
              Discover a World of Stories and Knowledge Welcome to our online
              bookstore — your go-to destination for books that inspire,
              educate, and entertain. Explore a wide range of genres, from
              timeless classics to the latest academic and motivational reads —
              all handpicked for every kind of reader.
            </p>
            <label className="flex items-center mb-10 gap-2 border px-3 py-2 rounded-2xl w-full dark:bg-slate-900 dark:text-white">
              <svg
                className="h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="15" height="16" x="4" y="3" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="flex-1 bg-transparent dark:text-white text-black placeholder-gray outline-none focus:outline-none focus:ring-0"
                required
              />
            </label>
          </div>
          <Link to="/signup" className="bg-blue-500 rounded-2xl py-3 px-2 font-bold text-white mt-10 hover:shadow-lg hover:shadow-blue-800 hover:bg-blue-800 transition duration-300">
            Get Started
          </Link>
        </div>
        <div className=" flex justify-center items-center order-1 w-full md:w-1/2">
          <img
            className=" item w-full h-75 md:h-full md:w-full max-w-md object-cover"
            src={BookCoffee}
            alt="books"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
