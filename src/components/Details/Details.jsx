import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Details.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";

const Details = ({
  oldBids,
  details,
  newBid,
  deleteAuction,
  setAuctions
}) => {
  const navigate = useNavigate();

  if (!details) {
    return <div>Detaljer för auktionen är inte tillgängliga.</div>;
  }

  const { Title, AuctionID, EndDate, StartingPrice, Description } = details;
  console.log(details);

  
  
  const currentDate = new Date();
  const auctionEndDate = new Date(EndDate);
  const isAuctionOver = auctionEndDate < currentDate;

  const handleDelete = async() => {
    await deleteAuction(details.AuctionID);
    setAuctions(prev => prev.filter(auction => auction.AuctionID !== details.AuctionID));
    navigate("/");
  };

  // Determine the highest bid from both old and new bids
  const allBids = [...oldBids, ...newBid];
  const highestBid = allBids.reduce((max, bid) => Math.max(max, bid.Amount || 0), 0);

  const handleBidPageNavigation = () => {
    navigate('/bid', { state: { auctionId: AuctionID, highestBid: highestBid } });
  };

  return (
    <>
      <NavLink to="/" className="nav-link">
        <Button variant="outline-primary">{' <<'} Tillbaka</Button>
      </NavLink>
      <div id="details-container">
        <div className="auction-details">
          <ListGroup>
            <ListGroup.Item><h2>{Title}</h2></ListGroup.Item>
            <ListGroup.Item>Auktions ID: {AuctionID}</ListGroup.Item>
            <ListGroup.Item>Slutdatum: {EndDate}</ListGroup.Item>
            <ListGroup.Item>Utgångspris: {StartingPrice} kr</ListGroup.Item>
            <ListGroup.Item>Beskrivning: {Description}</ListGroup.Item>
          </ListGroup>
        </div>
        

        {!isAuctionOver && allBids.length > 0 && (
          <ListGroup>
            <div className="auction-details">
              <ListGroup.Item><h2>Budhistorik</h2></ListGroup.Item>
              <ul className="bid-list">
                {allBids.map((bid) => bid.Amount && (
                  <li key={bid.BidID}>{bid.Amount} kr</li>
                ))}
              </ul>
            </div>
          </ListGroup>
        )}

        {isAuctionOver && (
          <ListGroup>
            <div className="auction-details">
              <ListGroup.Item><h2>Högsta bud</h2></ListGroup.Item>
              <ListGroup.Item>{highestBid} kr</ListGroup.Item>
            </div>
          </ListGroup>
        )}

        {!isAuctionOver && (
          <Button id="bid-btn" variant="primary" onClick={handleBidPageNavigation}>
            Lägg ett bud
          </Button>
        )}

        {!allBids.length && (
          <Button id="erase-btn" variant="danger" onClick={handleDelete}>
            Radera
          </Button>
        )}
      </div>
    </>
  );
};

export default Details;
