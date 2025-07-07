"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiFileText, FiShoppingCart } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  // ฟังก์ชันเช็ค active
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-72 bg-white shadow-md border-r border-gray-200 flex flex-col p-6">
      {/* Dashboards Subtitle */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4 tracking-wide select-none">
        Dashboards
      </h2>

      {/* เมนูหลัก */}
      <nav className="flex flex-col space-y-1 text-base font-medium">
        {/* Overview */}
        <Link
          href="/admin"
          className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isActive("/admin")
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <FiGrid className="w-5 h-5" />
          Overview
        </Link>

        {/* Purchase Order */}
        <Link
          href="/admin/purchase-order"
          className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isActive("/admin/purchase-order")
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          Purchase Order
        </Link>
      </nav>

      {/* เมนูอื่น ๆ ต่อได้เลย */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase mt-8 mb-4 tracking-wide select-none">
        Management
      </h2>

      <nav className="flex flex-col space-y-1 text-base font-medium">
        <Link
          href="/admin/products"
          className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isActive("/admin/products")
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <FiFileText className="w-5 h-5" />
          Products
        </Link>
      </nav>
    </aside>
  );
}
