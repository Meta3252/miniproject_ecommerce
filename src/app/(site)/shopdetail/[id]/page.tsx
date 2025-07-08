"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { text } from "stream/consumers";

type Product = {
  id: number;
  name: string;
  price_per_unit: number;
  image_url: string;
  category: string;
  stock_quantity: number;
};

export default function ShopDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderId: string | number;
    productName: string;
    quantity: number;
    totalPrice: number;
  } | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isStockAlertOpen, setIsStockAlertOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const totalPrice = product ? product.price_per_unit * quantity : 0;


  const handleConfirmClick = () => {
    if (product && quantity > product.stock_quantity) {
      setIsStockAlertOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

 
  const handleSubmit = async () => {
    if (!product) return;

    const orderData = {
      customer_name: name,
      email,
      address,
      items: [
        {
          product_name: product.name,
          quantity,
        },
      ],
    };

    try {
      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const result = await res.json();
        // ดึง order_number จาก response
        const orderNumber = result.order_number || "N/A";

        setOrderConfirmation({
          orderId: orderNumber,
          productName: product.name,
          quantity,
          totalPrice,
        });
        setIsConfirmModalOpen(true);
        setIsModalOpen(false);

        setName("");
        setEmail("");
        setAddress("");
        setQuantity(1);
      } else {
        alert("Failed to save order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-black">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-bold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20 flex flex-col items-center justify-start gap-12 font-sans">
      <div className="flex flex-col lg:flex-row items-start gap-12 w-full max-w-6xl mt-10">
        <div className="relative w-[300px] rounded-2xl shadow-lg overflow-hidden bg-white p-4 flex flex-col items-center">
          <div className="self-end mb-2">
            <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-lg">
              {product.category}
            </span>
          </div>

          <div className="w-[280px] h-[280px] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={`http://localhost:5001${product.image_url}`}
              alt={product.name}
              width={220}
              height={220}
              className="object-contain rounded-2xl"
            />
          </div>

          <div className="w-full mt-4 text-center">
            <p className="font-semibold text-xl text-gray-900 truncate">{product.name}</p>
            <p className="text-gray-600 text-base mt-1">{product.price_per_unit.toLocaleString()} Baht</p>
            <p className="text-red-600 text-sm mt-2">
              สินค้าคงเหลือ: <span className="font-medium">{product.stock_quantity}</span> ชิ้น
            </p>
          </div>
        </div>



        {/* Order Form */}
        <div className="bg-white w-full flex-1 rounded-2xl shadow-xl p-12">
          <h2 className="text-center font-extrabold text-2xl mb-10 text-gray-900 tracking-wide">
            Order Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <label className="font-semibold block mb-2 text-gray-800">Product</label>
                <p className="text-gray-900 text-lg">{product.name}</p>
              </div>

              <div>
                <label className="font-semibold block mb-2 text-gray-800">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-48 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2 text-gray-800">Total Price</label>
                <p className="text-blue-600 font-bold text-lg">
                  {totalPrice.toLocaleString()} Baht
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <label className="font-semibold block mb-2 text-gray-800">Customer Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2 text-gray-800">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2 text-gray-800">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your shipping address"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 mt-12">
            <button
              onClick={() => router.back()}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Back
            </button>
            <button
              onClick={handleConfirmClick}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal (Order Summary) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>

            <h2 className="text-center font-extrabold text-2xl mb-8 text-gray-900 tracking-wide">
              Your Order Summary
            </h2>

            <div className="space-y-5 text-gray-800 text-base leading-relaxed">
              <div>
                <p className="font-semibold">Product</p>
                <p>{product?.name}</p>
              </div>
              <div>
                <p className="font-semibold">Quantity</p>
                <p>{quantity} Ea</p>
              </div>
              <div>
                <p className="font-semibold">Total Price</p>
                <p className="text-blue-600 font-bold">{totalPrice.toLocaleString()} Baht</p>
              </div>
              <div>
                <p className="font-semibold">Customer Name</p>
                <p>{name}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{email}</p>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p>{address}</p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Status: </span>
                  <span className="text-red-600">Waiting for transaction</span>
                </p>
              </div>
              <p className="text-red-600 text-sm font-semibold mt-6 text-center">
                *You can track your order via email.
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Success Modal */}
      {isConfirmModalOpen && orderConfirmation && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold"
              aria-label="Close confirmation modal"
            >
              ×
            </button>

            <h2 className="text-center font-extrabold text-2xl mb-6 text-gray-900">
              คำสั่งซื้อของคุณ
            </h2>

            <div className="space-y-4 text-gray-800 text-base leading-relaxed">
              <p>
                เลข Order ของคุณคือ:{" "}
                <span className="font-semibold">{orderConfirmation.orderId}</span>
              </p>

              <p>
                สินค้า: <span className="font-semibold">{orderConfirmation.productName}</span>
              </p>

              <p>
                จำนวน: <span className="font-semibold">{orderConfirmation.quantity} ชิ้น</span>
              </p>

              <p>
                ยอดเงินรวม:{" "}
                <span className="font-semibold text-blue-600">
                  {orderConfirmation.totalPrice.toLocaleString()} บาท
                </span>
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  router.push("/");
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Alert Modal */}
      {isStockAlertOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsStockAlertOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold"
              aria-label="Close stock alert modal"
            >
              ×
            </button>
            <h2 className="text-center font-extrabold text-2xl mb-6 text-red-600">
              สินค้าไม่เพียงพอ
            </h2>
            <p className="text-center text-gray-800 text-base leading-relaxed">
              จำนวนที่สั่ง ({quantity}) เกินจำนวนสินค้าคงเหลือ ({product?.stock_quantity}) กรุณาลดจำนวนสินค้าที่สั่ง
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsStockAlertOpen(false)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
