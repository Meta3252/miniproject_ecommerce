// ตัวอย่างการ fetch ใน Component (Client Component)
"use client";

import { useEffect, useState } from "react";
import { FiPackage, FiDollarSign, FiCheck, FiClipboard } from "react-icons/fi";

type DashboardData = {
  totalOrdersCompleted: number;
  waitingForTransactionCount: number;
  totalRevenue: number;
};

type DashboardCardProps = {
  type: "Total" | "Waiting for transaction" | "Confirmed";
};

export default function DashboardCard({ type }: DashboardCardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/dashboard")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading data</div>;

  if (type === "Total") {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FiPackage /> Total
        </p>
        <p className="text-3xl font-bold mt-2">฿{data.totalRevenue.toLocaleString()}</p>
      </div>
    );
  }

  if (type === "Waiting for transaction") {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FiClipboard /> Waiting for transaction
        </p>
        <p className="text-3xl font-bold mt-2">{data.waitingForTransactionCount.toLocaleString()}</p>
      </div>
    );
  }

  if (type === "Confirmed") {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FiCheck /> Confirmed Revenue
        </p>
        <p className="text-3xl font-bold mt-2">{data.totalOrdersCompleted.toLocaleString()}</p>
      </div>
    );
  }

  return null;
}
