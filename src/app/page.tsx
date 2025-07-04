// pages/index.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white">
      {/* --- Banner Section --- */}
      <section className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[460px] xl:h-[500px]">
        <div className="relative w-full h-full">
          <Image
            src="/images/Black_Electronic_Promo_Instagram_Post.png"
            alt="Banner"
            fill
            style={{ objectFit: "contain", paddingTop: 64, background: "#1a1a1a" }}
            sizes="(max-width: 768px) 100vw, 768px"
          />

          {/* ปุ่มวางที่ขวาล่าง แต่ไม่ติดขอบ */}
          <div className="absolute bottom-6 right-6 z-10">
            <button className="bg-white text-black px-6 py-2 rounded shadow font-semibold hover:bg-gray-200 text-sm">
              SHOP NOW
            </button>
          </div>
        </div>
      </section>


      {/* --- Top Rated Properties Section --- */}
      <section className="w-full max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold mb-2 text-black">Top Rated<br />Properties</h2>
        <div className="w-16 h-1 bg-black mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Ram 16 Gb", price: "839 baht" },
            { name: "Ram 8 Gb", price: "550 baht" },
            { name: "GTX 1060", price: "6500 baht" },
            { name: "RTX 3050 Ti", price: "9900 baht" },
          ].map((item, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded">
              <div className="h-28 bg-gray-300 mb-2 rounded" />
              <div className="text-sm font-semibold text-black">{item.name}</div>
              <div className="text-xs text-gray-600">{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section className="w-full max-w-6xl px-6 pb-16">
        <div className="bg-gray-100 p-6 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-xl font-bold mb-2 text-black">About Us</h3>
            <p className="text-xs text-gray-600 mb-4">
              Leading website selling computer products
            </p>
            <button className="bg-sky-500 text-white px-4 py-2 rounded text-sm hover:bg-sky-600">
              Read more
            </button>
          </div>
          <div className="text-5xl font-bold text-gray-300 hidden md:block pr-6">
            BANNER
          </div>
        </div>
      </section>
    </main>
  );
}
