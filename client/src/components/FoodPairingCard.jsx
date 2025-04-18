import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const FoodPairingCard = ({ pairing }) => {
  // Error handling: Ensure the pairing object exists and has the expected properties
  if (!pairing) {
    return <div>Food pairing data is missing.</div>;
  }

  const {
    name,
    origin,
    description,
    ingredients,
    price,
    rating,
    available,
  } = pairing;

  return (
    <div className="food-pairing-card">
      <h2>{name}</h2>
      <p><strong>Origin:</strong> {origin}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Ingredients:</strong> {ingredients.join(", ")}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Rating:</strong> {rating} / 5</p>
      <p><strong>Available:</strong> {available ? "Yes" : "No"}</p>
    </div>
  );
};

// PropTypes validation
FoodPairingCard.propTypes = {
  pairing: PropTypes.shape({
    name: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
};

export default FoodPairingCard;
