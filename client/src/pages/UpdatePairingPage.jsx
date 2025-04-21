import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdatePairingPage({ setFoodPairings }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    description: '',
    ingredients: '',
    price: '',
    rating: '',
    available: false
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/food-pairings/${id}`)
      .then(res => {
        const pairing = res.data;
        setFormData({
          ...pairing,
          ingredients: pairing.ingredients.join(', ')
        });
      })
      .catch(err => console.error('Error fetching pairing:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/food-pairings/${id}`, updatedData);
      alert('Pairing updated!');

      // After update, either re-fetch or directly update the list of food pairings
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/food-pairings`);
      setFoodPairings(response.data); // Update the parent component's state with new data
      navigate('/'); // Navigate back to Home page
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed. See console for details.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', backgroundColor: '#000', color: '#fff' }}>
      <h2>Update Food Pairing</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required style={inputStyle} /><br />
        <input name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" required style={inputStyle} /><br />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required style={inputStyle} /><br />
        <input name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients (comma-separated)" required style={inputStyle} /><br />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required style={inputStyle} /><br />
        <input name="rating" type="number" value={formData.rating} onChange={handleChange} placeholder="Rating" required style={inputStyle} /><br />
        <label style={{ display: 'block', margin: '1rem 0' }}>
          Available:
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
        </label>
        <button type="submit" style={{ ...inputStyle, backgroundColor: '#fff', color: '#000', cursor: 'pointer' }}>Update</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  margin: '0.5rem 0',
  padding: '0.75rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

export default UpdatePairingPage;
