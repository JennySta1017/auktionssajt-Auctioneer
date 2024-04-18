import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Bid.css';
import Button from 'react-bootstrap/Button'; 
import { NavLink } from "react-router-dom";

const Bid = ({ handleSubmitBid }) => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const auctionId = location.state.auctionId; 
  const [bidAmount, setBidAmount] = useState(''); 
  const [bidder, setBidder] = useState(''); 
  const [highestBid, setHighestBid] = useState(0); 
  const [noBidsMessage, setNoBidsMessage] = useState(''); 

  // useEffect körs vid montering och uppdateringar baserade på location.state
  useEffect(() => {
    if (location.state) {
      // Ställ in högsta bud om det finns tillgängligt
      if (location.state.highestBid) {
        setHighestBid(location.state.highestBid);
      }
      
      // Kontrollera om det inte finns några bud och om startpriset är större än 0
      if (location.state.startingPrice > 0 && !location.state.hasBids) {
        setNoBidsMessage(`Inga bud är lagda. Utgångspris är ${location.state.startingPrice} kr.`);
      }
    }
  }, [location.state]);

  const onSubmit = (e) => {
    e.preventDefault(); // Förhindra att formuläret skickas automatiskt
    handleSubmitBid(e, auctionId, bidAmount, bidder); // Skicka bud
  };
 
  return (
    <>
      <Button variant="outline-primary" onClick={() => navigate(-1)} className="top-space">
        {' <<'} Tillbaka 
      </Button>
      <div>
        <form className="bid" onSubmit={onSubmit}>
          <h2 className="bid-title">Lägg nytt bud</h2>
          
          {highestBid > 0 && (
            <p className="leading-bid">Ledande bud: <strong>{highestBid} kr</strong></p> // Visa högsta budet om det finns
          )}

          {noBidsMessage && (
            <div>
              <p>Inga bud är lagda.</p> 
              <p>Utgångspriset är <strong>{location.state.startingPrice} kr</strong>.</p> 
            </div>
          )}
          <fieldset disabled>
            <div className="input-container">
              <label htmlFor="auctionId" className="form-label">
                Auktion Id 
              </label>
              <input
                type="text"
                className="form-control"
                id="auctionId"
                value={auctionId}
                disabled
              />
            </div>
          </fieldset>

          <div className="input-container">
            <label htmlFor="amount" className="form-label">
              Belopp 
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="bidder" className="form-label">
              Budgivare 
            </label>
            <input
              type="text"
              className="form-control"
              id="bidder"
              value={bidder}
              onChange={(e) => setBidder(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Lägg bud 
          </button>
        </form>
      </div>
    </>
  );
};

export default Bid; 
