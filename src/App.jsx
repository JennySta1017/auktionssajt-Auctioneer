import "./index.css";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Result from "./components/Result/Result";
import Details from "./components/Details/Details";
import Selling from "./components/Selling/Selling";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [auctions, setAuctions] = useState([]);

  // Fetch auction data on component mount
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
      console.log(data);
    };

    fetchAuctions();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home auctions={auctions} />} />
        <Route path="/result" element={<Result />} />
        <Route path="/details" element={<Details />} />
        <Route path="/selling" element={<Selling />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
