
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

const Freebook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getFreeDownloadableBooks = async () => {
      try {
        const apiKey = process.env.VITE_GOOGLE_BOOKS_API_KEY;
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=free+ebooks&filter=free-ebooks&maxResults=12&key=${apiKey}`
        );

        const filteredData = res.data.items
          ?.map((book) => ({
            id: book.id,
            title: book.volumeInfo.title,
            name: book.volumeInfo.authors?.[0] || "Unknown Author",
            description: book.volumeInfo.description?.substring(0, 100) || "No description available",
            image: book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
            price: "Free",
            category: book.volumeInfo.categories?.[0] || "General",
            type: "Free",
            isDownloadable: book.accessInfo?.pdf?.isAvailable || false,
            downloadLink: book.accessInfo?.pdf?.acsTokenLink || book.accessInfo?.pdf?.downloadLink || null,
          }))
          .filter((book) => book.isDownloadable && book.downloadLink); 

        setBook(filteredData || []);
      } catch (error) {
        console.log("Error fetching free books:", error);
      }
    };

    getFreeDownloadableBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mb-6">
        <h1 className="font-semibold text-xl pb-2">Free Downloadable Books</h1>
        <p>
          Discover a wide collection of free downloadable books — from classics to learning materials.
        </p>
      </div>

      <div>
        {book.length > 0 ? (
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No downloadable books found.</p>
        )}
      </div>
    </div>
  );
};

export default Freebook;
