import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddPairingPage from './pages/AddPairingPage';
import UpdatePairingPage from './pages/UpdatePairingPage';
import UserPairingsPage from './pages/UserPairingsPage'; // ✅ Correct import

function App() {
  const [foodPairings, setFoodPairings] = useState([]);

  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/add" style={{ marginRight: '1rem' }}>Add New Pairing</Link>
        <Link to="/pairings-by-user">View by User</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home foodPairings={foodPairings} setFoodPairings={setFoodPairings} />} />
        <Route path="/add" element={<AddPairingPage />} />
        <Route path="/edit/:id" element={<UpdatePairingPage setFoodPairings={setFoodPairings} />} />
        <Route path="/pairings-by-user" element={<UserPairingsPage />} /> {/* ✅ Updated route */}
      </Routes>
    </Router>
  );
}

export default App;
