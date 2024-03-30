
import Home from "../Home/Home";
import { NavLink } from "react-router-dom";


const Details = ({auction}) => {
  

     return (
    <div id="details-container">
    <div className="auction-details">
      <h2>{auction.Title}</h2>
      <p>Auction ID: {auction.AuctionID}</p>
      <p>End Date: {auction.EndDate}</p>
      <p>Starting Price: {auction.StartingPrice} kr</p>
      <p>Description: {auction.Description}</p>
    </div>
    <div className="auction-details">
      <NavLink to="/result" className="nav-link">
      Place a bid
      </NavLink>
      </div>
      </div>
      
  );
};
  

export default Details;
