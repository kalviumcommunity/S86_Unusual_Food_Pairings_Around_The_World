import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddPairingPage from './pages/AddPairingPage';
import UpdatePairingPage from './pages/UpdatePairingPage';

function App() {
  const [foodPairings, setFoodPairings] = useState([]);

  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/add">Add New Pairing</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home foodPairings={foodPairings} setFoodPairings={setFoodPairings} />} />
        <Route path="/add" element={<AddPairingPage />} />
        <Route path="/edit/:id" element={<UpdatePairingPage setFoodPairings={setFoodPairings} />} />
      </Routes>
    </Router>
  );
}

export default App;
