
import Home from "../Home/Home";

const Details = ({auction}) => {
 /*  
  } */
     return (
    <div className="auction-details">
      <h2>{auction.Title}</h2>
      <p>Auction ID: {auction.AuctionID}</p>
      <p>End Date: {auction.EndDate}</p>
      <p>Starting Price: {auction.StartingPrice} kr</p>
      <p>Description: {auction.Description}</p>
    </div>
  );
};
  

export default Details;
