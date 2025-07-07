'use client';
import { useState } from 'react';

const allItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: i % 2 === 0 ? 'RTX 3050 Ti' : 'Ram 8 Gb',
    type: i % 2 === 0 ? 'Graphic Card' : 'Ram',
    price: '9900 Baht',
    image: i % 2 === 0
        ? '/images/graphic-card-cover.jpg'
        : '/images/Ram.jpg',
}));

export default function Home() {
    const [filter, setFilter] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(9);

    const filteredItems = allItems
        .filter((item) => !filter || item.type === filter)
        .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, limit);

    return (
        <main className="pt-24 px-8 pb-16 bg-gray-50 min-h-screen">
            {/* Filter & Search */}
            <div className="flex items-center gap-4 flex-wrap pb-10">
                {['All', 'Graphic Card', 'Ram'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type === 'All' ? null : type)}
                        className={`text-sm px-4 py-2 rounded-full border transition-all 
              ${filter === (type === 'All' ? null : type)
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'}`}
                    >
                        {type}
                    </button>
                ))}
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-auto text-black border border-gray-300 px-4 py-2 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-[#E0E2E6] rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col"
                    >
                        {/* Badge: หมวดหมู่ */}
                        <span className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow">
                            {item.type}
                        </span>

                        {/* ภาพสินค้า */}
                        <div className="w-full h-48 bg-[#E0E2E6] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="object-contain h-full"
                            />
                        </div>

                        {/* ชื่อและราคา */}
                        <div className="text-lg font-medium text-gray-800 mb-1">{item.name}</div>
                        <div className="text-blue-500 font-semibold">{item.price}</div>
                    </div>

                ))}
            </div>

            {/* See More */}
            {limit < allItems.length && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setLimit((prev) => prev + 6)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition-all"
                    >
                        See more
                    </button>
                </div>
            )}
        </main>
    );
}
