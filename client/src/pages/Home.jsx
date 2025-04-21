import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodPairingCard from '../components/FoodPairingCard';
import { Link } from 'react-router-dom';

function Home() {
  const [foodPairings, setFoodPairings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/food-pairings`)
      .then(res => {
        setFoodPairings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load food pairings. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/food-pairings/${id}`)
      .then(() => {
        setFoodPairings((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error('Error deleting pairing:', err);
        alert('Delete failed');
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Unusual Food Pairings</h1>
      <Link to="/add" style={{ marginBottom: '1rem', display: 'block' }}>Add New Pairing</Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : foodPairings.length === 0 ? (
        <p>No pairings found.</p>
      ) : (
        foodPairings.map((pairing) => (
          <FoodPairingCard
            key={pairing._id}
            pairing={pairing}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Home;
