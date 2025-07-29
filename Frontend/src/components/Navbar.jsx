import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartProvider";
import { Menu, ShoppingCart, ClipboardList, Moon, Sun } from "lucide-react";
import Login from "./Login";
import Logout from "./Logout";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();
  const { authUser } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      {authUser?.role === "admin" && (
        <li>
          <Link
            to="/admin"
            className="bg-amber-500 text-white px-3 py-2 rounded-md hover:bg-amber-800 duration-300"
          >
            Admin
          </Link>
        </li>
      )}
      <li><Link to="/">Home</Link></li>
      <li><Link to="/course">Course</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/about">About Us</Link></li>
    </>
  );

  return (
    <div
      className={`w-full px-4 sticky top-0 z-50 transition-all duration-300 ease-in-out 
        ${scrolled ? "shadow-md bg-base-200 dark:bg-slate-900" : ""}
        dark:text-white`}
    >
      <div className="navbar flex-wrap flex-col sm:flex-row justify-between items-center">
        
        {/* START SECTION */}
        <div className="navbar-start w-full sm:w-auto flex items-center justify-between sm:justify-start">
          {/* Hamburger Menu for mobile */}
          <div className="dropdown sm:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-52 z-10"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer dark:text-yellow-300 ml-2"
          >
            ReadLaB
          </Link>
        </div>

        {/* CENTER SECTION - Nav links (desktop only) */}
        <div className="navbar-center hidden sm:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* END SECTION */}
        <div className="navbar-end w-full sm:w-auto flex items-center justify-end gap-3 mt-2 sm:mt-0">
          {/* Search */}
          <div className="hidden md:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) {
                  navigate(`/course?search=${query.trim()}`);
                }
              }}
              className="px-3 py-2 border rounded-md flex items-center gap-2 dark:border-gray-600"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="border-none outline-none bg-transparent text-black dark:text-white"
              />
            </form>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Toggle Dark Mode"
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
          </button>

          {/* Cart + Orders */}
          {authUser && (
            <>
              <Link to="/cart" className="relative" title="My Cart">
                <ShoppingCart className="h-7 w-7 hover:scale-110 transition-transform" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              </Link>

              <Link to="/orders" title="My Orders">
                <ClipboardList className="h-7 w-7 hover:scale-110 transition-transform" />
              </Link>
            </>
          )}

          {/* Auth Buttons */}
          {authUser ? (
            <Logout />
          ) : (
            <div>
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-800 duration-300"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;


