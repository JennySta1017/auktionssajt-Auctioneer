
import { NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
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
  const navigate = useNavigate(); 
  const currentDate = new Date();

  // Kontrollera om auktionen har passerat sitt slutdatum
  const auctionEndDate = new Date(details.EndDate);
  const isAuctionOver = auctionEndDate < currentDate;

  //För att hantera att ta bort en auktion
  const handleDelete = async() => {
    try {
      await deleteAuction(details.AuctionID);
      console.log("Auktionen har tagits bort.");
      navigate("/"); // Navigera tillbaka till Home
    } catch (error) {
      console.error("Ett fel uppstod vid försök att ta bort auktionen:", error);
    }
  };
   
  console.log(oldBids);
  
  const highestBid = oldBids.reduce((maxBid, bid) => {
    return bid.Amount > maxBid ? bid.Amount : maxBid;
  }, 0);

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
    
    {!isAuctionOver && oldBids.length > 0 && ( // Om auktionen är öppen och bud-arrayen är längre än 0 - visa budhistorik
      <ListGroup>
      <div className="auction-details">
      <ListGroup.Item><h2>Budhistorik</h2></ListGroup.Item>
      <ul className="bid-list">
       
  {oldBids.map((bid) => (
    <li key={bid.BidID}>{bid.Amount} kr</li> 
  ))}
    </ul>
      </div></ListGroup>
  )}

  {isAuctionOver && oldBids.length > 0 &&( // Om auktionen är avslutad och bud-arrayen är längre än 0 - visa sista budet
    <ListGroup>
    <div className="auction-details">
    <ListGroup.Item><h2>Högsta bud</h2></ListGroup.Item>  
    <ListGroup.Item><p>{highestBid}</p></ListGroup.Item>
    </div></ListGroup>
  )}
    <div className="auction-details">
  {!isAuctionOver && ( // om auktionen är öppen - visa "place a bid"
      
      <NavLink to="/bid">
  <Button id="bid-btn" variant="primary">Lägg ett bud</Button>
</NavLink>
         
    )}
    
  {!oldBids || oldBids.length === 0 && ( // Om det inte finns några bud, visa radera-knappen
     <Button id="erase-btn" variant="danger" onClick={handleDelete}>
     Radera
   </Button>
)}

    </div>
    </div>
    </>
  );
};

export default Details


