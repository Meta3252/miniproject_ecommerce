'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  category: string;
  id: number;
  name: string;
  price_per_unit: number;
  image_url: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredItems = products
    .filter((item) => !filter || item.category === filter)
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, limit);

  return (
    <main className="pt-24 px-8 pb-16 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      {/* Filter & Search */}
      <div className="flex items-center gap-4 flex-wrap pb-10 max-w-7xl mx-auto">
        {['All', 'Graphic Card', 'Ram'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category === 'All' ? null : category)}
            className={`text-sm px-5 py-2 rounded-full border transition-all
              font-semibold
              ${
                filter === (category === 'All' ? null : category)
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-700 hover:scale-105 hover:shadow-md'
              }`}
          >
            {category}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search products..."
          className="ml-auto text-gray-900 border border-gray-300 px-5 py-2 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-shadow shadow-sm max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/shopdetail/${item.id}`} className="group">
            <div
              className="relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer transform transition-transform duration-300 group-hover:scale-105 origin-bottom select-none"
            >
              <span className="absolute top-5 right-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg tracking-wide z-20 pointer-events-none">
                {item.category}
              </span>
              <div className="w-full h-56 bg-gray-100 rounded-3xl overflow-hidden mb-6 flex items-center justify-center">
                <img
                  src={`http://localhost:5001${item.image_url}`}
                  alt={item.name}
                  className="object-contain max-h-full rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
              <p className="text-indigo-700 font-bold text-lg">{Number(item.price_per_unit).toLocaleString()} Baht</p>
            </div>
          </Link>
        ))}
      </div>

      {/* See More */}
      {limit < products.length && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setLimit((prev) => prev + 6)}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
          >
            See more
          </button>
        </div>
      )}
    </main>
  );
}
