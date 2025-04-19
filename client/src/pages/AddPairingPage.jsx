import React, { useState } from 'react';
import axios from 'axios';

function AddPairing({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    description: '',
    ingredients: '',
    price: '',
    rating: '',
    available: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pairingData = {
        ...formData,
        ingredients: formData.ingredients.split(',').map((item) => item.trim()),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating)
      };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/food-pairings`, pairingData);
      onAdd(res.data);
      setFormData({
        name: '', origin: '', description: '', ingredients: '', price: '', rating: '', available: false
      });
    } catch (err) {
      console.error('Error adding pairing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border-4 border-pink-300">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center font-[Quicksand]">🍍 Add a Food Pairing</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 rounded-xl border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="Origin"
            required
            className="w-full p-3 rounded-xl border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-3 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            required
            className="w-full p-3 rounded-xl border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <div className="flex gap-4">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="flex-1 p-3 rounded-xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              required
              className="flex-1 p-3 rounded-xl border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <label className="flex items-center gap-2 text-pink-600 font-medium mt-2">
            <input
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={handleChange}
              className="accent-pink-500"
            />
            Available
          </label>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-400 via-yellow-300 to-lime-400 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Add Pairing 🍓
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPairing;
