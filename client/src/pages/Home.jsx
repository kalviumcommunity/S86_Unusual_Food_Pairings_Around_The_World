import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodPairingCard from '../components/FoodPairingCard';

function Home() {
  const [foodPairings, setFoodPairings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/food-pairings')
      .then((res) => setFoodPairings(res.data))
      .catch((err) => console.error('Error fetching food pairings:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Unusual Food Pairings</h1>
      {foodPairings.length === 0 ? (
        <p>No pairings found.</p>
      ) : (
        foodPairings.map(pairing => (
          <FoodPairingCard key={pairing._id} pairing={pairing} />
        ))
      )}
    </div>
  );
}

export default Home;
