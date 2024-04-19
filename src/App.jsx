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
  const [newBidAmount, setNewBidAmount] = useState("");
  const [newBidder, setNewBidder] = useState("");
  const [highestBid, setHighestBid] = useState(0);
  // Fetch auctions
  const [auctions, setAuctions] = useState([]);
  const [oldBids, setOldBids] = useState([]);
  const [newBid, setNewBid] = useState([]);
  // Search auctions
  const [inputValue, setInputValue] = useState("");
  const [details, setDetails] = useState(() => {
    // Hämta sparade detaljer från localStorage om de finns
    const storedDetails = localStorage.getItem("details");
    return storedDetails ? JSON.parse(storedDetails) : null;
  });
  const [searchResults, setSearchResults] = useState([]);
  // Store auctions created on the Selling page
  const [createdAuctions, setCreatedAuctions] = useState([]);
  // Creat new auctions
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newStartingPrice, setNewStartingPrice] = useState(null);
  const [seller, setSeller] = useState("");
  const groupCode = "4onm";

  const navigate = useNavigate();

  // Fetch auctions
  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await fetch(
        "https://auctioneer2.azurewebsites.net/auction/4onm"
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
          `https://auctioneer2.azurewebsites.net/auction/4onm/${id}`
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
        `https://auctioneer2.azurewebsites.net/bid/4onm/${auctionId}`
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
  const deleteAuction = async (auctionId) => {
    try {
      const response = await fetch(
        `https://auctioneer2.azurewebsites.net/auction/4onm/${auctionId}`,
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

  // Submit a new auction
  const createNewAuction = async () => {
    const newAuction = {
      GroupCode: groupCode,
      Title: newTitle,
      Description: newDescription,
      StartDate: new Date().toISOString(),
      EndDate: newEndDate,
      StartingPrice: newStartingPrice,
      CreatedBy: seller,
    };

    const apiUrl = "https://auctioneer2.azurewebsites.net/auction/" + groupCode;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAuction),
    });

    if (!response.ok) {
      alert("Det gick inte bra att skapa auktion, försök igen!");
      return;
    }

    // setCreatedAuctions([...createdAuctions, newAuction]);
    setCreatedAuctions([...createdAuctions, newAuction]);

    setNewTitle("");
    setNewDescription("");
    setNewEndDate("");
    setNewStartingPrice("");
    setSeller("");
    navigate("/");
  };

  // Submit a new bid
  const handleSubmitBid = async (e, auctionId, newBidAmount, newBidder) => {
    e.preventDefault();
    // Now highestBid is defined and can be used here
    if (newBidAmount <= highestBid) {
      alert("Det nya budet måste överstiga det nuvarande högsta budet");
      return;
    }
    const myObj = {
      AuctionID: auctionId,
      Amount: newBidAmount,
      Bidder: newBidder,
    };
    const apiUrl = "https://auctioneer2.azurewebsites.net/bid/4onm";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myObj),
    });
    if (!response.ok) {
      alert(
        "Något gick fel. Kom ihåg att budbeloppet måste vara högre än det ledande budet eller utgångspriset."
      );
      return;
    }
    setNewBid([...newBid, myObj]);
    setNewBidAmount("");
    setNewBidder("");
    navigate("/details");
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
              newBid={newBid}
              deleteAuction={deleteAuction}
              setAuctions={setAuctions}
            />
          }
        />

        <Route path="/details/:id" element={<Details />} />

        <Route
          path="/bid"
          element={
            <Bid
              handleSubmitBid={handleSubmitBid}
              auctionId={details?.AuctionID}
              newBidAmount={newBidAmount}
              setNewBidAmount={setNewBidAmount}
              newBidder={newBidder}
              setNewBidder={setNewBidder}
            />
          }
        />
        <Route
          path="/newAuction"
          element={
            <NewAuction
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
              newEndDate={newEndDate}
              setNewEndDate={setNewEndDate}
              newStartingPrice={newStartingPrice}
              setNewStartingPrice={setNewStartingPrice}
              seller={seller}
              setSeller={setSeller}
              createNewAuction={createNewAuction}
            />
          }
        />

        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
