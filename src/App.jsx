import "./index.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Bid from "./components/Bid.jsx/Bid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "./components/Result/Results";
import NewAuction from "./components/NewAuction/NewAuction";
import Contact from "./components/Contact/Contact";

const App = () => {
  // Fetch auctions
  const [auctions, setAuctions] = useState([]);
  const [oldBids, setOldBids] = useState([]);
  const [newBid, setNewBid] = useState([]);
  // Search auctions
  const [inputValue, setInputValue] = useState("");
  const [details, setDetails] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // Store auctions created on the Selling page
  const [createdAuctions, setCreatedAuctions] = useState([]);

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
  const handleDetails = async (id, isNewAuction = false) => {
    try {
      let data;
      if (isNewAuction) {
        data = createdAuctions.find((auction) => auction.AuctionID === id);
      } else {
        const response = await fetch(
          `https://auctioneer.azurewebsites.net/auction/4onm/${id}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }
        data = await response.json();
      }

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

  // Delete auction
  const deleteAuction = async (id) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/auction/4onm/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Auktionen har tagits bort.");
      } else {
        console.error("Det uppstod ett problem vid borttagning av auktionen.");
      }
    } catch (error) {
      console.error("Ett fel uppstod:", error);
    }
  };

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

  // Add an auction
  const handleAddAuction = () => {
    navigate("/newAuction");
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
              newBid={newBid}
              inputValue={inputValue}
              handleDetails={handleDetails}
              handleSearchInputChange={handleSearchInputChange}
              handleSearchSubmit={handleSearchSubmit}
              handleAddAuction={handleAddAuction}
              createdAuctions={createdAuctions}
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

        <Route
          path="/details"
          element={
            <Details
              oldBids={oldBids}
              details={details}
              deleteAuction={deleteAuction}
            />
          }
        />

        <Route path="/bid" element={<Bid />} />

        <Route path="/newAuction" element={<NewAuction />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
