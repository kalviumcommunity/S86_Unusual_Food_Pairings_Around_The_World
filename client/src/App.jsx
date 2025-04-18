import React from 'react';
import FoodPairingCard from './components/FoodPairingCard';

function App() {
  const dummyPairing = {
    name: "Mango and Chili",
    origin: "Mexico",
    description: "A sweet and spicy combo that surprises the palate.",
    ingredients: ["Mango", "Chili Powder"],
    price: 5.99,
    rating: 4.5,
    available: true,
  };

  return (
    <div>
      <h1>Unusual Food Pairings</h1>
      <FoodPairingCard pairing={dummyPairing} />
    </div>
  );
}

export default App;
