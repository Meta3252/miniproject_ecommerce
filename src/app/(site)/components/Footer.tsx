import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#011F4B] text-white py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">

                <div className="mb-6 md:mb-0">
                    <h1 className="text-2xl font-bold">Logo</h1>
                    <p className="text-sm text-gray-300">Leading company selling computer products at the cheapest price</p>
                </div>

                <div className="mb-6 md:mb-0 flex flex-col space-y-2">
                    <h1 className="font-bold text-lg">Company</h1>
                    <a href="#" className="hover:text-gray-300 transition">Home</a>
                    <a href="#" className="hover:text-gray-300 transition">Shop</a>
                    <a href="#" className="hover:text-gray-300 transition">Contact</a>
                </div>

                <div>
                    <h1 className="font-bold text-lg">Contact Us</h1>
                    <p className="text-sm text-gray-300">Phone: 1234567890</p>
                    <p className="text-sm text-gray-300">Email: company@email.com</p>
                    <p className="text-sm text-gray-300">Location: 100 TH</p>
                    <div className="flex space-x-4 mt-2 text-white">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="hover:text-blue-500 transition" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-pink-400 transition" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="hover:text-sky-400 transition" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="hover:text-blue-400 transition" />
                        </a>
                    </div>
                </div>

            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 px-4 text-sm text-gray-400 text-left">
                © 2022 M&N | All rights reserved
            </div>
        </footer>

    );
}
