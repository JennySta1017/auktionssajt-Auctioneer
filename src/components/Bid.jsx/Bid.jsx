import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Bid.css';
import Button from 'react-bootstrap/Button'; 

const Bid = ({ createBid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auctionId = location.state.auctionId;
  const [bidAmount, setBidAmount] = useState('');
  const [bidder, setBidder] = useState('');
  const [highestBid, setHighestBid] = useState(location.state.highestBid || 0); // Initialize with the highest bid from the location state

  useEffect(() => {
    // If there's no highest bid in the location state, fetch it from the server
    if (!location.state.highestBid) {
      const fetchHighestBid = async () => {
        try {
          const response = await fetch(`https://auctioneer2.azurewebsites.net/highestBid/${auctionId}`);
          if (!response.ok) {
            throw new Error("Unable to fetch highest bid");
          }
          const data = await response.json();
          setHighestBid(data.highestBid); // Set the highest bid from the server
        } catch (error) {
          console.error("Error fetching highest bid:", error);
        }
      };
      fetchHighestBid();
    }
  }, [auctionId, location.state.highestBid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    // Check if the bid amount is less than or equal to the highest bid amount
    if (parseFloat(bidAmount) <= parseFloat(highestBid)) {
      alert("Du måste lägga ett bud som är högre än det högsta budet.");
      return; // Exit the function if the bid amount is less than or equal to the highest bid amount
    }
  
    await createBid(auctionId, bidAmount, bidder);
    navigate(`/details/${auctionId}`);
  };
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <>
    <Button className="m-1" variant="outline-primary" onClick={handleBackClick}>
        {' <<'} Tillbaka
      </Button>
    <div className="bid-container">
    <div className="bid-box">
      <h2>Lägg nytt bud</h2>
      <div>
        <p>
          {highestBid > 0 ? (
            <>
              Högsta budet: <span className="bold-text">{highestBid} kr</span>
            </>
          ) : (
            "Det finns inga bud än"
          )}
        </p>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="bidAmount">Budsumma:</label>
            <div className="bid-amount-input">
              <input 
                type="number" 
                id="bidAmount" 
                value={bidAmount} 
                onChange={(e) => setBidAmount(e.target.value)} 
                required 
              />
            </div>
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
    </>
  );
};

export default Bid;
