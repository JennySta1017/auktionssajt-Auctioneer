import Home from "../Home/Home";
import { NavLink, useLocation } from "react-router-dom";
import "./Details.css";


const Details = () => {
  const location = useLocation();
  const auction = location.state?.auction;
  console.log(auction);
   // Kontrollerar om auction är definierat innan egenskaperna skrivs ut
   if (!auction) {
    return <div>Detaljer för auktionen är inte tillgängliga.</div>;
    
  }

  const currentDate = new Date();

  // Kontrollera om auktionen har passerat sitt slutdatum
  const auctionEndDate = new Date(auction.EndDate);
  const isAuctionOver = auctionEndDate < currentDate;

     return (
      <>
    <div className="auction-details">
      <h2>{auction.Title}</h2>
      <p>Auction ID: {auction.AuctionID}</p>
      <p>End Date: {auction.EndDate}</p>
      <p>Starting Price: {auction.StartingPrice} kr</p>
      <p>Description: {auction.Description}</p>
    </div>
    <div className="auction-details">
    {!isAuctionOver && (
      <NavLink to="/bid" className="nav-link">
      Place a bid
      </NavLink>
    )}
      </div>
      </>
  );
};

export default Details
