'use client';

import { useState } from 'react';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price_per_unit: '',
    stock_quantity: '',
    image_url: '',
  });

  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file.');
      return;
    }

    setMessage('');
    setUploading(true);

    const form = new FormData();
    form.append('image', file);

    try {
      const res = await fetch('http://localhost:5001/api/products/upload-image', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        setFormData(prev => ({ ...prev, image_url: data.imageUrl }));
        setPreview(`http://localhost:5001${data.imageUrl}`);
        setMessage('');
      } else {
        setMessage(data.error || 'Upload failed.');
      }
    } catch (error) {
      setMessage('Network error during image upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // เช็คกรอกข้อมูลครบทุกช่อง และมีรูปภาพ
    if (
      !formData.category ||
      !formData.name ||
      !formData.price_per_unit ||
      !formData.stock_quantity ||
      !formData.image_url
    ) {
      setMessage('Please fill in all required fields and upload an image.');
      return;
    }

    const payload = {
      category: formData.category,
      name: formData.name,
      price_per_unit: parseFloat(formData.price_per_unit),
      stock_quantity: parseInt(formData.stock_quantity),
      image_url: formData.image_url,
    };

    try {
      const res = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(true);
        setMessage('');
        setFormData({
          category: '',
          name: '',
          price_per_unit: '',
          stock_quantity: '',
          image_url: '',
        });
        setPreview(null);
      } else {
        const error = await res.json();
        setMessage('Error: ' + error.error);
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10 border border-gray-300"
        >
          <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">
            Add New Product
          </h2>

          <label className="block mb-6">
            <span className="text-gray-800 font-semibold mb-1 block text-lg">Category</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-5 py-3
                text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-300
                focus:outline-none transition duration-300 ease-in-out"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Graphic Card">Graphic Card</option>
              <option value="Ram">Ram</option>
            </select>
          </label>

          <label className="block mb-6">
            <span className="text-gray-800 font-semibold mb-1 block text-lg">
              Name <span className="text-red-600">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-5 py-3
                text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-300
                focus:outline-none transition duration-300 ease-in-out"
              placeholder="Product name"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-800 font-semibold mb-1 block text-lg">
              Price per Unit <span className="text-red-600">*</span>
            </span>
            <input
              type="number"
              step="0.01"
              name="price_per_unit"
              value={formData.price_per_unit}
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-5 py-3
                text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-300
                focus:outline-none transition duration-300 ease-in-out"
              placeholder="0.00"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-800 font-semibold mb-1 block text-lg">Stock Quantity</span>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-5 py-3
                text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-300
                focus:outline-none transition duration-300 ease-in-out"
              placeholder="0"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-800 font-semibold mb-2 block text-lg">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full cursor-pointer text-gray-700"
              disabled={uploading}
              required
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-xl mx-auto mb-8 border border-gray-300 shadow-md"
            />
          )}

          <button
            type="submit"
            disabled={uploading}
            className={`w-full bg-blue-600 text-white py-4 rounded-xl font-semibold tracking-wide
              transition duration-300 ease-in-out ${
                uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {uploading ? 'Uploading...' : 'Add Product'}
          </button>

          {message && (
            <p className="mt-6 text-center text-sm font-semibold text-red-600">{message}</p>
          )}
        </form>
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl text-center">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-extrabold mb-2 text-green-600">Success</h3>

        <p className="text-gray-900 text-lg mb-6">Product added successfully!</p>


        <button
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          onClick={() => setShowModal(false)}
          autoFocus
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}
