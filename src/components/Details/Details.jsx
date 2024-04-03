import Home from "../Home/Home";
import { NavLink, useLocation } from "react-router-dom";
import "./Details.css";


const Details = ({oldBids}) => {
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

  //För att hantera att ta bort en auktion
  const handleDelete = () => {

  } 

     return (
      <>
      <NavLink to="/" className="nav-link">
      {'<<'} Tillbaka
      </NavLink>
    <div className="auction-details">
      <h2>{auction.Title}</h2>
      <p>Auction ID: {auction.AuctionID}</p>
      <p>End Date: {auction.EndDate}</p>
      <p>Starting Price: {auction.StartingPrice} kr</p>
      <p>Description: {auction.Description}</p>
    </div>
    {oldBids.length > 0 && (
    <div className="auction-details">
      <h2>Bids placed</h2>
    <ul>
  {oldBids.map((bid, idx) => (
    <li key={idx}>{bid.Amount}</li>
    
  ))}

</ul>
    </div>
    )}

    <div className="auction-details">
    {!isAuctionOver && (
      <NavLink to="/bid" className="nav-link">
      Place a bid
      </NavLink>
    )}
    {!oldBids && (
  <button onClick={handleDelete} className="delete-button">
    Radera
  </button>
)}

      </div>
      </>
  );
};

export default Details


