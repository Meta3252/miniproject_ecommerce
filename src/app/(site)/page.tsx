'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/Footer';

type Product = {
  id: number;
  name: string;
  price_per_unit: number;
  image_url: string | null;
  category?: string;
  stock_quantity?: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();

        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center bg-white">
        {/* --- Hero Section --- */}
        <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black text-white">
          <Image
            src="/images/Black_Electronic_Promo_Instagram_Post.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-extrabold">
              Build Your Dream PC Today
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mb-6">
              Discover high-performance RAM, graphics cards, and components at unbeatable prices.
            </p>
            <Link href="/shop">
              <button className="bg-white text-black px-6 py-3 rounded text-sm md:text-base hover:bg-gray-200 transition font-semibold px-8 py-3 rounded-md transition">
                SHOP NOW
              </button>
            </Link>
          </div>
        </section>

        {/* --- Top Rated Products Section --- */}
        <section className="w-full max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-bold mb-2 text-black">Top Rated Products</h2>
          <div className="w-16 h-1 bg-black mb-8" />

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((item) => (
                <div key={item.id} className="bg-gray-200 p-4 rounded flex flex-col items-center">
                  <div className="w-full h-28 mb-2 rounded overflow-hidden relative">
                    {item.image_url ? (
                      <Image
                        src={`http://localhost:5001${item.image_url}`}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-black">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.price_per_unit.toLocaleString()} baht</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- About Us Section --- */}
        <section className="w-full max-w-6xl px-6 pb-16">
          <div className="bg-gray-100 p-6 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-xl font-bold mb-2 text-black">About Us</h3>
              <p className="text-xs text-gray-600 mb-4">Leading website selling computer products</p>
              <button className="bg-sky-500 text-white px-4 py-2 rounded text-sm hover:bg-sky-600">
                Read more
              </button>
            </div>
            <div className="text-5xl font-bold text-gray-300 hidden md:block pr-6">BANNER</div>
          </div>
        </section>
      </div>
    </main>
  );
}
