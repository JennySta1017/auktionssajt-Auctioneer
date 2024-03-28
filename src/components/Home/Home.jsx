import { v4 as uuidv4 } from "uuid";
import Details from "../Details/Details";
import { useState } from "react";

const Home = ({ auctions }) => {

  const [auctionDetails, setAuctionDetails] = useState(null); // Uppdaterar vald auktion
  
  const handleAuctionDetails = (auction) => { // Hanterar clickfunktionen för att sätta auktionsdetaljerna
    setAuctionDetails(auction);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group my-5">
            <input
              type="text"
              className="form-control"
              placeholder="Ange ett sökord eller objektnamn"
            />
            <button className="btn btn-primary" type="button" id="button-addon">
              Sök
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-no-wrap">
        {auctions &&
          auctions.map((auction) => (
            <div className="card" style={{ width: "18rem" }} key={uuidv4()}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item" onClick={() => handleAuctionDetails(auction)}>
                  {auction.AuctionID} : {auction.Title}
                </li>
                <li className="list-group-item">{auction.EndDate}</li>
                <li className="list-group-item">{auction.StartingPrice} kr</li>
              </ul>
              <div className="card-footer"></div>
            </div>
          ))}
      </div>
      {auctionDetails && <Details auction={auctionDetails} />} {/* Hämtar nytt värde till auctionDetails och skickar till Details */}
    </div>
  );
};

export default Home;
