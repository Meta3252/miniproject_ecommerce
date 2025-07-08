'use client';

import { useEffect, useState } from 'react';
import DashboardCard from '../../components/DashboardCard';

type OrderItem = {
  id: number;
  order_number: string;
  quantity: number;
  total_price: number;
  order_date: string;
  status: string;
  product_name: string;
  image_url: string;
  customer_name: string;
  address: string;
};

export default function PurchaseOrder() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/order-items')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrderItems(data);
        } else if (Array.isArray(data.data)) {
          setOrderItems(data.data);
        } else {
          setOrderItems([]);
          console.warn('Unexpected data format:', data);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setOrderItems([]);
      });
  }, []);

  const confirmOrder = async (id: number) => {
    const res = await fetch(`http://localhost:5001/api/order-items/${id}/confirm`, {
      method: 'PUT',
    });

    if (res.ok) {
      setOrderItems(prev =>
        prev.map(item => (item.id === id ? { ...item, status: 'Completed' } : item))
      );
      setSelectedItem(null);
    }
  };

  return (
    <div className="p-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardCard type="Total" />
        <DashboardCard type="Waiting for transaction" />
        <DashboardCard type="Confirmed" />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-black">Purchase Order</h2>

      {/* Order Items */}
      <div className="space-y-4">
        {Array.isArray(orderItems) && orderItems.length > 0 ? (
          orderItems.map(item => (
            <div
              key={item.id}
              className="flex items-start bg-white shadow rounded-lg p-4"
            >
              <img
                src={`http://localhost:5001${item.image_url}`}
                alt={item.product_name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">#{item.order_number}</h3>
                <h3 className="text-lg font-bold text-gray-900">{item.product_name}</h3>
                <p className="text-sm text-gray-600">
                  Order Date: {new Date(item.order_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">
                  Total: ฿{Number(item.total_price).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                {item.status !== 'Completed' && (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setSelectedItem(item)}
                  >
                    See more details
                  </button>
                )}
                <div
                  className="mt-2 text-sm font-semibold text-white px-3 py-1 rounded-full"
                  style={{
                    backgroundColor:
                      item.status === 'Waiting for transaction'
                        ? '#fbbf24'
                        : item.status === 'Paid'
                        ? '#3b82f6'
                        : item.status === 'Shipped' || item.status === 'Completed'
                        ? '#10b981'
                        : '#6b7280',
                  }}
                >
                  {item.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No order items found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-8 relative animate-fade-in max-h-[90vh] overflow-auto">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Order Details - #{selectedItem.order_number}
            </h2>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Details */}
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-gray-900">Product:</span> <br />
                  <span className="text-lg font-medium">{selectedItem.product_name}</span>
                </div>
                <div>
                  <span className="font-semibold">Customer:</span> {selectedItem.customer_name}
                </div>
                <div>
                  <span className="font-semibold">Address:</span> {selectedItem.address}
                </div>
                <div>
                  <span className="font-semibold">Order Date:</span>{' '}
                  {new Date(selectedItem.order_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Quantity:</span> {selectedItem.quantity}
                </div>
                <div>
                  <span className="font-semibold">Total:</span>{' '}
                  <span className="text-green-700 font-bold">
                    ฿{Number(selectedItem.total_price).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  <span
                    className="px-2 py-1 rounded-full text-white text-xs font-medium"
                    style={{
                      backgroundColor:
                        selectedItem.status === 'Waiting for transaction'
                          ? '#fbbf24'
                          : selectedItem.status === 'Paid'
                          ? '#3b82f6'
                          : selectedItem.status === 'Shipped' || selectedItem.status === 'Completed'
                          ? '#10b981'
                          : '#6b7280',
                    }}
                  >
                    {selectedItem.status}
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <img
                  src={`http://localhost:5001${selectedItem.image_url}`}
                  alt={selectedItem.product_name}
                  className="w-64 h-64 object-cover rounded-xl border"
                />
              </div>
            </div>

            {/* Confirm Button */}
            {selectedItem.status !== 'Completed' && (
              <div className="mt-6 text-right">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded transition"
                  onClick={() => confirmOrder(selectedItem.id)}
                >
                  ✅ Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
