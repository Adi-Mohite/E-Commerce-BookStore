import React from 'react';
import Footerr from './Footerr';

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          About Our Book Store
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-10">
          Welcome to <span className="text-blue-600 dark:text-blue-400 font-semibold">ReadLaB</span>,
          your one-stop online bookstore. We are dedicated to providing readers with a wide range of books—from fiction,
          non-fiction, educational, to self-help and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Vast Collection</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover thousands of books across multiple categories carefully curated for every type of reader.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Secure & Easy Shopping</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy a hassle-free shopping experience with secure payments, smooth navigation, and user-friendly interface.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Fast Delivery</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get your favorite books delivered right to your doorstep with our reliable and quick delivery services.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our mission is to inspire, educate, and empower people by making knowledge accessible to everyone.
            We believe books have the power to change lives, and we strive to deliver the best reading experience possible.
          </p>
        </div>
        <Footerr/>
      </div>
    </div>
  );
};

export default About;
