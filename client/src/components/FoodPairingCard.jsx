function FoodPairingCard({ pairing }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem", borderRadius: "10px" }}>
        <h2>{pairing.name}</h2>
        <p><strong>Origin:</strong> {pairing.origin}</p>
        <p>{pairing.description}</p>
        <p><strong>Ingredients:</strong> {pairing.ingredients.join(", ")}</p>
        <p><strong>Price:</strong> ${pairing.price}</p>
        <p><strong>Rating:</strong> ⭐ {pairing.rating}</p>
        <p><strong>Available:</strong> {pairing.available ? "Yes" : "No"}</p>
      </div>
    );
  }
  
  export default FoodPairingCard;
  