import "./index.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Bid from "./components/Bid.jsx/Bid";
import Selling from "./components/Selling/Selling";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "./components/Result/Results";
import NewAuction from "./components/NewAuction/NewAuction";

const App = () => {
  // Fetch auctions
  const [auctions, setAuctions] = useState([]);
  const [oldBids, setOldBids] = useState([]);
  // Search auctions
  const [inputValue, setInputValue] = useState("");
  const [details, setDetails] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  // Fetch auctions
  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/auction/4onm"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const data = await response.json();
      setAuctions(data);
    };

    fetchAuctions();
  }, []);

  // Fetch details
  const handleDetails = async (id) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/auction/4onm/${id}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }
      const data = await response.json();
      setDetails(data);
      navigate("/details", { replace: true, state: {} });
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch old bids
  useEffect(() => {
    const fetchOldBids = async (auctionId) => {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/bid/4onm/${auctionId}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const data = await response.json();
      setOldBids(data);
    };

    // Fetch old bids for the last selected auction
    if (details && details.AuctionID) {
      fetchOldBids(details.AuctionID);
    }
  }, [details]);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle search auctions
  const handleSearchSubmit = () => {
    const filteredAuctions = auctions.filter((auction) =>
      auction.Title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredAuctions);
    navigate("/results", { replace: true, state: { inputValue } });
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              auctions={auctions}
              oldBids={oldBids}
              inputValue={inputValue}
              handleDetails={handleDetails}
              handleSearchInputChange={handleSearchInputChange}
              handleSearchSubmit={handleSearchSubmit}
            />
          }
        />

        <Route
          path="/results"
          element={
            <Results
              searchResults={searchResults}
              handleDetails={handleDetails}
              oldBids={oldBids}
            />
          }
        />

        <Route path="/details" element={<Details />} />

        <Route path="/bid" element={<Bid />} />

        <Route path="/selling" element={<Selling />} />

        <Route path="/newAuction" element={<NewAuction />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
