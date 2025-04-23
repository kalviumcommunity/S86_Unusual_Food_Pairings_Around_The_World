import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPairingPage() {
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    description: '',
    ingredients: '',
    price: '',
    rating: '',
    available: true,
    created_by: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users for dropdown
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim())
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/food-pairings`, payload);
      alert('Food pairing added successfully!');
    } catch (err) {
      console.error('Error adding pairing:', err);
      alert(err?.response?.data?.errors?.[0]?.msg || 'Failed to add pairing.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Add a New Food Pairing</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="origin" placeholder="Origin" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} required /><br />
        <input name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} required /><br />
        <input name="price" type="number" step="0.01" placeholder="Price" onChange={handleChange} required /><br />
        <input name="rating" type="number" step="0.1" placeholder="Rating (0-5)" onChange={handleChange} required /><br />
        <label>
          Available:
          <input name="available" type="checkbox" checked={formData.available} onChange={handleChange} />
        </label><br /><br />

        <label>User:</label>
        <select name="created_by" value={formData.created_by} onChange={handleChange} required>
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select><br /><br />

        <button type="submit">Add Pairing</button>
      </form>
    </div>
  );
}

export default AddPairingPage;
