import React from 'react';
import PropTypes from 'prop-types';

function FoodPairingCard({ pairing }) {
  const { name, origin, description, ingredients, price, rating, available } = pairing;

  if (!pairing) {
    return <p>Food pairing not available</p>;
  }

  return (
    <div className="food-pairing-card">
      <h2>{name}</h2>
      <p><strong>Origin:</strong> {origin}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Rating:</strong> {rating} / 5</p>
      <p><strong>Available:</strong> {available ? 'Yes' : 'No'}</p>
    </div>
  );
}

FoodPairingCard.propTypes = {
  pairing: PropTypes.shape({
    name: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    available: PropTypes.bool,
  }).isRequired,
};

export default FoodPairingCard;
