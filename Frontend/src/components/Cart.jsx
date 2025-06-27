import React from "react";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 border border-gray-500 
                       text-gray-700 dark:text-white 
                       hover:bg-gray-100 dark:hover:bg-slate-700 
                       rounded-md duration-300"
          >
            🏠 Go to Home
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md 
                         bg-white dark:bg-slate-800"
            >
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">By {item.name}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                    {item.price === "Free" ? "Free" : `₹${item.price}`}
                  </p>

                  <div className="flex items-center mt-3 space-x-3">
                    <button
                      className="px-3 py-1 border rounded-md 
                                 bg-gray-100 dark:bg-slate-700 
                                 hover:bg-gray-200 dark:hover:bg-slate-600 
                                 text-lg"
                      onClick={() => decreaseQty(item.id)}
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 border rounded-md 
                                 bg-gray-100 dark:bg-slate-700 
                                 hover:bg-gray-200 dark:hover:bg-slate-600 
                                 text-lg"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="px-4 py-2 border border-red-500 
                             text-red-500 hover:bg-red-500 hover:text-white 
                             rounded-md duration-300"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {cart.length > 0 && (
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-3">
           
            <button
              onClick={() => navigate("/course")}
              className="px-5 py-2 border border-gray-500 
                         text-gray-700 dark:text-white 
                         hover:bg-gray-100 dark:hover:bg-slate-700 
                         rounded-md duration-300"
            >
              ⬅️ Continue Shopping
            </button>

           
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 border border-gray-500 
                         text-gray-700 dark:text-white 
                         hover:bg-gray-100 dark:hover:bg-slate-700 
                         rounded-md duration-300"
            >
              🏠 Go to Home
            </button>
          </div>

        
          <div className="p-5 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md 
                          w-full md:w-auto bg-white dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-3 text-center text-gray-800 dark:text-white">
              Checkout Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              🛍️ Total Items: <span className="font-semibold">{totalItems}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              💰 Total Price: <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
            </p>

            <CheckoutButton amount={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
