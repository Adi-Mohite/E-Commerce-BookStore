import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const randomSubjects = [
    "history",
    "science",
    "technology",
    "fiction",
    "romance",
    "horror",
    "fantasy",
    "business",
    "philosophy",
    "travel",
    "health",
    "art",
    "sports",
  ];
  const randomQuery =
    randomSubjects[Math.floor(Math.random() * randomSubjects.length)];
  const query = queryParams.get("search") || randomQuery;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${apiKey}`;

        const res = await axios.get(url);

        const formatted = res.data.items?.map((book) => ({
          id: book.id,
          title: book.volumeInfo.title,
          name: book.volumeInfo.authors?.[0] || "Unknown Author",
          description:
            book.volumeInfo.description?.substring(0, 100) ||
            "No description available",
          image:
            book.volumeInfo.imageLinks?.thumbnail ||
            "https://dummyimage.com/150x220/cccccc/000000&text=No+Image",
          price:
            book.saleInfo?.saleability === "FREE"
              ? "Free"
              : (Math.random() * 100).toFixed(2),
          category: book.volumeInfo.categories?.[0] || "General",
          type: book.saleInfo?.saleability === "FREE" ? "Free" : "Paid",
          isDownloadable: book.accessInfo?.pdf?.isAvailable || false,
          downloadLink:
            book.accessInfo?.pdf?.acsTokenLink ||
            book.accessInfo?.pdf?.downloadLink ||
            null,
        }));

        setBooks(formatted || []);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [location.search]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="pt-30 text-center">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you{" "}
          <span className="text-blue-500">Here :)</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Discover books by author, title, or keyword. Fast delivery & great
          discounts await.
        </p>
        <Link to="/">
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Course;
