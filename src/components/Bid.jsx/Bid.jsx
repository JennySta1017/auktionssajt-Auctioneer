import React, { useState } from 'react';
import './Bid.css';

const Bid = ({ createBid }) => {
  const [auctionId, setAuctionId] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [bidder, setBidder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Skicka data för att skapa nytt bud
    createBid(auctionId, bidAmount, bidder);
    // Återställ formuläret
    setAuctionId('');
    setBidAmount('');
    setBidder('');
  };

  return (
    <div className="bid-container">
      <div className="bid-box">
        <h2>Lägg nytt bud</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="auctionId">Auction ID:</label>
            <input 
              type="text" 
              id="auctionId" 
              value={auctionId} 
              onChange={(e) => setAuctionId(e.target.value)} 
              required 
            />
          </div>
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
