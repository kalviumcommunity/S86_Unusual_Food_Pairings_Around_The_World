import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodPairingCard from '../components/FoodPairingCard';

const UserPairingsPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pairings, setPairings] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchPairings = async (userId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/food-pairings?created_by=${userId}`);
      setPairings(res.data);
    } catch (err) {
      console.error('Error fetching pairings:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) {
      fetchPairings(userId);
    } else {
      setPairings([]);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#111', color: '#fff' }}>
      <h1>View Food Pairings by User</h1>

      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">-- Select a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '2rem' }}>
        {pairings.length > 0 ? (
          pairings.map((pairing) => (
            <FoodPairingCard key={pairing._id} pairing={pairing} />
          ))
        ) : (
          <p>No pairings to show</p>
        )}
      </div>
    </div>
  );
};

export default UserPairingsPage;
