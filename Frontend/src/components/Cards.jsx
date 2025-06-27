import React from "react";
import { useCart } from "./CartProvider";
import { toast } from "react-hot-toast";

const Cards = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="my-3 p-3">
      <div className="card dark:bg-slate-800 bg-white w-full max-w-[384px] shadow-xl h-[500px] sm:h-[550px] hover:scale-105 duration-300 border">
        <figure className="dark:bg-slate-700 bg-white h-[300px] flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-contain"
            src={item.image}
            alt={item.name}
          />
          <div
            className={`absolute top-2 left-2 px-2 py-1 text-sm font-bold text-white rounded ${
              item.type === "Free" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {item.type}
          </div>
        </figure>

        <div className="card-body flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="card-title">{item.title}</h2>
            <div className="w-32 text-center my-2 mx-2 text-white text-xl bg-blue-600 rounded cursor-pointer hover:bg-blue-900 duration-300">
              {item.category}
            </div>
          </div>

          <p>{item.description}</p>
          <div className="flex items-center text-sm dark:text-white text-white">
            <span className="mr-1 text-black dark:text-white">Author:</span>
            <span className="font-semibold text-black dark:text-white">
              {item.name}
            </span>
          </div>

          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline">
              {item.price === "Free" ? "Free" : `₹${item.price}`}
            </div>

            {item.isDownloadable && item.downloadLink ? (
              <a
                href={item.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-4xl border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300"
              >
                Download
              </a>
            ) : (
              <button
                onClick={() => {
                  addToCart(item);
                  console.log("Adding to cart:", item);
                  toast.success(`${item.title} added to cart`);
                }}
                className="cursor-pointer px-3 py-1 rounded-4xl border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white duration-300"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
