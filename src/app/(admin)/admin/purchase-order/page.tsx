import DashboardCard from '../../components/DashboardCard';

export default function PurchaseOrder() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">Purchase Order</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard type="orders" />
        <DashboardCard type="revenue" />
      </div>
    </div>
  );
}
