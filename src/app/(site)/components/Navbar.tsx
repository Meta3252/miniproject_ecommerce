"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <nav
  className="fixed top-0 left-0 right-0 shadow-md dark:bg-gray-900 w-full z-50"
  style={{ backgroundColor: '#011F4B' }}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 text-2xl font-extrabold text-blue-600 dark:text-white">
              Logo
            </div>
            <div className="hidden md:flex space-x-8 font-semibold text-gray-700 dark:text-gray-300">
              <a
                href="/"
                className="inline-flex items-center px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                About
              </a>

              <a
                href="/shop"
                className="inline-flex items-center px-3 py-2 bg-[#85A9DF] text-white rounded-md hover:bg-[#6e96d0] transition-colors duration-300"
              >
                <FaShoppingCart className="mr-2 text-white" />
                Shop
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-700 dark:text-gray-200 focus:outline-none"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-extrabold text-blue-600 dark:text-white">MyLogo</div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col mt-4 space-y-1 px-4 font-semibold text-gray-700 dark:text-gray-300">
          <a
            href="/"
            className="block px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/about"
            className="block px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="/shop"
            className="flex items-center px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <FaShoppingCart className="mr-2 text-[#85A9DF]" />
            Shop
          </a>
        </nav>
      </aside>
    </>
  );
}
