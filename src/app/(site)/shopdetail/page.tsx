"use client";

import { useState } from "react";
import Image from "next/image";


export default function ShopDetail() {
    const [quantity, setQuantity] = useState<number>(1);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPrice = 12000;

    return (
        <div className="min-h-screen bg-white px-6 py-10 flex flex-col items-center justify-start gap-10">
            {/* Section: Product + Order Form */}
            <div className="flex flex-col lg:flex-row items-start gap-10 w-full max-w-6xl mt-10">
                {/* Product Card */}
                <div className="relative w-[230px] h-[230px] rounded-xl shadow overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                        src="/images/graphic-card-cover.jpg" // ✅ เปลี่ยน path 
                        alt="RTX 3050 Ti"
                        width={180}
                        height={180}
                        className="object-contain"
                    />

                    {/* Badge */}
                    <span className="absolute top-3 right-3 bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-semibold z-10">
                        Graphic Card
                    </span>

                    {/* Text Info */}
                    <div className="absolute bottom-4 left-4 z-10">
                        <p className="font-semibold text-black">RTX 3050 Ti</p>
                        <p className="text-gray-600 text-sm">9900 Bath</p>
                    </div>
                </div>

                {/* Order Form */}
                <div className="bg-white w-full flex-1 rounded-xl shadow-md p-10">
                    <h2 className="text-center font-semibold text-lg mb-8 text-black">Order</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                        {/* Column 1 */}
                        <div className="space-y-5">
                            <div>
                                <label className="font-bold block mb-1 text-black">Product</label>
                                <p className="text-black">GTX 1060</p>
                            </div>

                            <div>
                                <label className="font-bold block mb-1 text-black">Quantity</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="border border-gray-300 px-3 py-1 rounded w-40 text-black"
                                />
                            </div>

                            <div>
                                <label className="font-bold block mb-1 text-black">Total Price</label>
                                <p className="text-gray-600">{totalPrice.toLocaleString()} Bath</p>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-5">
                            <div>
                                <label className="font-bold block mb-1 text-black">Name Customer</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border border-gray-300 px-3 py-1 rounded w-full text-black"
                                />
                            </div>

                            <div>
                                <label className="font-bold block mb-1 text-black">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="border border-gray-300 px-3 py-1 rounded w-full text-black"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6 mt-10">
                        <button className="bg-black text-white px-6 py-2 rounded">Back</button>
                        <button
                            className="bg-black text-white px-6 py-2 rounded"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Confirm
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl relative">
                                {/* ปุ่มปิด */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                                >
                                    ×
                                </button>

                                <h2 className="text-center font-bold text-lg mb-6 text-black">Your Order #1254</h2>

                                <div className="space-y-4 text-sm text-black">
                                    <div>
                                        <p className="font-bold">Product</p>
                                        <p>GTX 1060</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Quantity</p>
                                        <p>2 Ea</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Total Price</p>
                                        <p>12000 Bath</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Name Customer</p>
                                        <p>Test System</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Address</p>
                                        <p>1512012 Thai</p>
                                    </div>
                                    <div>
                                        <p className="text-xs">
                                            <span className="font-bold">Status: </span>
                                            <span className="text-red-600">Waiting for transaction</span>
                                        </p>
                                    </div>
                                    <p className="text-red-600 text-sm font-semibold mt-4">
                                        *You can track your order via email.
                                    </p>
                                </div>

                                {/* ปุ่ม Confirm ด้านล่าง */}
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-black text-white px-6 py-2 rounded"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
