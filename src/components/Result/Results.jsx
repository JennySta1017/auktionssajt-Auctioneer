import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Results = ({ searchResults, handleDetails, oldBids }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Iterate over auctions and calculate time remaining for each
      const updatedAuctions = searchResults.map((auction) => {
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
      // Update the state with the updated auctions
      setTimeRemaining(updatedAuctions);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [searchResults]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center flex-wrap mb-10">
        {timeRemaining &&
          timeRemaining.map((auction) => (
            <div className="card" key={uuidv4()}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item title"
                  onClick={() => handleDetails(auction.AuctionID)}
                >
                  {auction.AuctionID} . <b>{auction.Title}</b>
                </li>
                <li className="list-group-item original-price">
                  Utrop {auction.StartingPrice} SEK
                </li>
                {oldBids[auction.AuctionID] && (
                  <li className="list-group-item starting-price">
                    Startpris {auction.StartingPrice} SEK
                  </li>
                )}
              </ul>
              <div className="card-footer">
                <li className="list-group-item time">
                  <ion-icon name="alarm-outline"></ion-icon>{" "}
                  {auction.timeRemaining}
                </li>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Results;
