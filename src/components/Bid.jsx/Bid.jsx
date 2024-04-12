import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useLocation } from 'react-router-dom';
import './Bid.css';

const Bid = ({ createBid }) => {
  const location = useLocation();
  const auctionId = location.state.auctionId; // Access Auction ID passed from Details page
  const [bidAmount, setBidAmount] = useState('');
  const [bidder, setBidder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createBid(auctionId, bidAmount, bidder); // Use auctionId from state
    setBidAmount('');
    setBidder('');
  };

  return (
    <div className="bid-container">
      <div className="bid-box">
        <h2>Lägg nytt bud</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="bidAmount">Budsumma:</label>
            <input 
              type="number" 
              id="bidAmount" 
              value={bidAmount} 
              onChange={(e) => setBidAmount(e.target.value)} 
              required 
            />
          </div>
          <div className="input-container">
            <label htmlFor="bidder">Budgivare:</label>
            <input 
              type="text" 
              id="bidder" 
              value={bidder} 
              onChange={(e) => setBidder(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="bid-button">Lägg bud</button>
        </form>
      </div>
    </div>
  );
};
export default Bid;
