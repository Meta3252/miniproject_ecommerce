import { getDashboardData } from '../../lib/dashboardData';
import { FiPackage, FiDollarSign } from 'react-icons/fi';

type DashboardCardProps = {
  type: 'orders' | 'revenue';
};

export default async function DashboardCard({ type }: DashboardCardProps) {
  const data = await getDashboardData();

  if (type === 'orders') {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FiPackage /> Orders
        </p>
        <p className="text-3xl font-bold mt-2">{data.totalOrders.toLocaleString()}</p>
      </div>
    );
  }

  if (type === 'revenue') {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FiDollarSign /> Revenue
        </p>
        <p className="text-3xl font-bold mt-2">฿{data.totalRevenue.toLocaleString()}</p>
      </div>
    );
  }

  return null;
}
