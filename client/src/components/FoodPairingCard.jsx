import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FoodPairingCard({ pairing, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this pairing?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/food-pairings/${pairing._id}`);
        onDelete(pairing._id); // Call onDelete to update the state in Home component
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete. Please check the console for more info.');
      }
    }
  };

  return (
    <div style={cardStyle}>
      <h3>{pairing.name}</h3>
      <p><strong>Origin:</strong> {pairing.origin}</p>
      <p><strong>Description:</strong> {pairing.description}</p>
      <p><strong>Ingredients:</strong> {pairing.ingredients.join(', ')}</p>
      <p><strong>Price:</strong> ${pairing.price}</p>
      <p><strong>Rating:</strong> {pairing.rating}</p>
      <p><strong>Available:</strong> {pairing.available ? 'Yes' : 'No'}</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to={`/edit/${pairing._id}`}><button>Edit</button></Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '1rem',
  margin: '1rem 0',
  border: '1px solid #333',
  borderRadius: '6px',
  boxShadow: '0 2px 5px rgba(255, 255, 255, 0.1)'
};

FoodPairingCard.propTypes = {
  pairing: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FoodPairingCard;
