import React from 'react';
import "./Bid.css"; 


const Bid = () => {
  return (
    <div className="place-bid-container">
      <h2>Lägg ny bud</h2>
      <form>
        <label htmlFor="bidValue" className="place-bid-label">
          Bud summa:
        </label>
        <input
          type="number"
          id="bidValue"
          className="place-bid-input"
          placeholder="Ange budbelopp"
          required
        />
        <button type="submit" className="place-bid-button">
          Lägg bud
        </button>
      </form>
    </div>
  );
};

export default Bid;

