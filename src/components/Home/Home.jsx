import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";

const Home = ({
  auctions,
  inputValue,
  handleDetails,
  handleSearchInputChange,
  handleSearchSubmit,
  handleAddAuction,
  createdAuctions,
}) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  // Calculate time remaining for each auction
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedAuctions = auctions.map((auction) => {
        const currentTime = new Date().getTime();
        const dueTime = new Date(auction.EndDate).getTime();
        const difference = dueTime - currentTime;

        if (difference <= 0) {
          return { ...auction, timeRemaining: "AVSLUTADE" };
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          return { ...auction, timeRemaining: `${days} days ${hours} h` };
        }
      });
      setTimeRemaining(updatedAuctions);
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [auctions]);

  const currentDeadline = (endDate) => {
    const currentTime = new Date().getTime();
    const dueTime = new Date(endDate).getTime();
    const difference = dueTime - currentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${days} days ${hours} h`;
  };

  return (
    <div className="container mt-4">
      <button
        className="mb-2 btn btn-outline-success"
        type="submit"
        onClick={handleAddAuction}
      >
        Lägga till auktion <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ange ett sökord eller objektnamn"
              value={inputValue}
              onChange={handleSearchInputChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon"
              onClick={handleSearchSubmit}
            >
              Sök
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap mb-10">
        {timeRemaining &&
          timeRemaining.map((auction) => (
            <div className="card" key={uuidv4()}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item title"
                  onClick={() => handleDetails(auction.AuctionID)}
                >
                  <b>{auction.Title}</b>
                </li>
                <li className="list-group-item original-price">
                  Utrop {auction.StartingPrice} SEK
                </li>
              </ul>
              <div className="card-footer">
                <li className="list-group-item time">
                  <ion-icon name="alarm-outline"></ion-icon>{" "}
                  {auction.timeRemaining}
                </li>
              </div>
            </div>
          ))}

        {/* Display auctions created on the Selling page */}
        {createdAuctions &&
          createdAuctions.map((auction) => (
            <div className="card" key={uuidv4()}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item title"
                  onClick={() =>
                    handleDetails(
                      auction.AuctionID,
                      createdAuctions.includes(auction)
                    )
                  }
                >
                  <b>{auction.Title}</b>
                </li>
                <li className="list-group-item startingPrice">
                  {auction.StartingPrice} SEK
                </li>
                <li className="list-group-item endDate">
                  <ion-icon name="alarm-outline"></ion-icon>{" "}
                  {currentDeadline(auction.EndDate)}
                </li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
