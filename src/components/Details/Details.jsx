
import { NavLink} from "react-router-dom";
import "./Details.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";


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
      <div id="details-container">
    <div className="auction-details">
    <ListGroup>
    <ListGroup.Item><h2>{Title}</h2></ListGroup.Item>
      <ListGroup.Item>Auction ID: {AuctionID}</ListGroup.Item>
      <ListGroup.Item>End Date: {EndDate}</ListGroup.Item>
      <ListGroup.Item>Starting Price: {StartingPrice} kr</ListGroup.Item>
      <ListGroup.Item>Description: {Description}</ListGroup.Item>
      </ListGroup>
    </div>
    
    {!isAuctionOver && oldBids.length > 0 && ( // Om auktionen är öppen och bud-arrayen är längre än 0 - visa budhistorik
      <ListGroup>
      <div className="auction-details">
      <ul className="bid-list">
      <ListGroup.Item><li><h2>Bids placed</h2></li></ListGroup.Item>
    
  {oldBids.map((bid, idx) => (
    <ListGroup.Item><li key={idx}>{bid.Amount}</li></ListGroup.Item> 
  ))}
    </ul>
      </div></ListGroup>
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
  <Button variant="primary">Place a bid</Button>
</NavLink>
         
    )}
    
  {!oldBids || oldBids.length === 0 && ( // Om det inte finns några bud, visa radera-knappen
     <Button variant="danger" onClick={handleDelete}>
     Radera
   </Button>
)}

    </div>
    </div>
    </>
  );
};

export default Details


