'use client';
import { useState } from 'react';

const allItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: i % 2 === 0 ? 'RTX 3050 Ti' : 'Ram 8 Gb',
    type: i % 2 === 0 ? 'Graphic Card' : 'Ram',
    price: '9900 Baht',
    image: i % 2 === 0
        ? './images/graphic-card-cover.jpg'
        : './images/Ram.jpg',
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
        <main className="px-6 py-10 max-w-full">
            {/* Filter and Search */}
            <div className="flex items-center gap-4 flex-wrap">
                <button onClick={() => setFilter(null)} className="text-sm underline">All</button>
                <button onClick={() => setFilter('Graphic Card')} className="text-sm underline">Graphic Card</button>
                <button onClick={() => setFilter('Ram')} className="text-sm underline">Ram</button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-auto border px-3 py-1 rounded text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-100 rounded-2xl p-4 relative shadow hover:shadow-lg transition h-[300px] flex flex-col"
                    >
                        {/* ป้ายประเภทสินค้า */}
                        <span className="absolute top-3 right-3 bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
                            {item.type}
                        </span>

                        {/* ภาพสินค้า */}
                        <div className="w-full h-40 bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* ชื่อและราคา */}
                        <div className="text-base font-semibold text-gray-900">{item.name}</div>
                        <div className="text-gray-500">{item.price}</div>
                    </div>
                ))}
            </div>


            {/* See More */}
            {limit < allItems.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setLimit((prev) => prev + 6)}
                        className="bg-blue-100 hover:bg-blue-200 text-gray-700 px-6 py-2 rounded-full"
                    >
                        See more
                    </button>
                </div>
            )}
        </main>
    );
}
