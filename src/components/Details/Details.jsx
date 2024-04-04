import Home from "../Home/Home";
import { NavLink, useLocation } from "react-router-dom";
import "./Details.css";


const Details = ({
  oldBids,
  details,
  deleteAuction
}) => {
  if (!details) {
    return <div>Detaljer för auktionen är inte tillgängliga.</div>;
  }

  const { Title, AuctionID, EndDate, StartingPrice, Description } = details;
  console.log(details);
   
  const currentDate = new Date();

  // Kontrollera om auktionen har passerat sitt slutdatum
  const auctionEndDate = new Date(details.EndDate);
  const isAuctionOver = auctionEndDate < currentDate;

  //För att hantera att ta bort en auktion
  const handleDelete = async() => {
    try {
      await deleteAuction(details.AuctionID);
      console.log("Auktionen har tagits bort.");
    } catch (error) {
      console.error("Ett fel uppstod vid försök att ta bort auktionen:", error);
    }
  };
   
  console.log(oldBids);

     return (
      <>
      <NavLink to="/" className="nav-link">
      {' <<'} Tillbaka
      </NavLink>
    <div className="auction-details">
      <h2>{Title}</h2>
      <p>Auction ID: {AuctionID}</p>
      <p>End Date: {EndDate}</p>
      <p>Starting Price: {StartingPrice} kr</p>
      <p>Description: {Description}</p>
    </div>
    
    {!isAuctionOver && oldBids.length > 0 && ( // Om auktionen är öppen och bud-arrayen är längre än 0 - visa budhistorik
      <div className="auction-details">
      <h2>Bids placed</h2>
    <ul>
  {oldBids.map((bid, idx) => (
    <li key={idx}>{bid.Amount}</li> 
  ))}
    </ul>
      </div>
  )}

  {isAuctionOver && oldBids.length > 0 &&( // Om auktionen är avslutad och bud-arrayen är längre än 0 - visa sista budet
    <div className="auction-details">
    <h2>Final bid</h2>  
  <p>{oldBids[oldBids.length - 1].Amount}</p>
    </div>
  )}
    <div className="auction-details">
  {!isAuctionOver && ( // om auktionen är öppen - visa "place a bid"
      <NavLink to="/bid" className="nav-link">
      Place a bid
      </NavLink>    
    )}
    
  {!oldBids || oldBids.length === 0 && ( // Om det inte finns några bud, visa radera-knappen
    <button onClick={handleDelete} className="delete-button">
    Radera
    </button>
)}
    </div>
    </>
  );
};

export default Details


