import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodPairingCard from './components/FoodPairingCard';

function App() {
  const [foodPairings, setFoodPairings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/food-pairings') // Adjust the URL as needed
      .then((response) => {
        setFoodPairings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching food pairings:', error);
      });
  }, []);

  return (
    <div>
      <h1>Unusual Food Pairings</h1>
      {foodPairings.length === 0 ? (
        <p>Loading food pairings...</p>
      ) : (
        foodPairings.map((pairing) => (
          <FoodPairingCard key={pairing._id} pairing={pairing} />
        ))
      )}
    </div>
  );
}

export default App;
