import { useState } from "react";
import "./NewAuction.css";

// TODO: Lägg in props här ifall createdAuctions & setCreatedAuctions kommer från en ParentComponent som är beroende av uppdaterat state
const NewAuction = () => { // ({ createdAuctions, setCreatedAuctions }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newStartingPrice, setNewStartingPrice] = useState(null);
  const [seller, setSeller] = useState("");
  const groupCode = '4onm';

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

    // TODO: Är detta props?
    setCreatedAuctions([...createdAuctions, newAuction]);

    setNewTitle("");
    setNewDescription("");
    setNewEndDate("");
    setNewStartingPrice("");
    setSeller("");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Skapa ny auktion</h1>
      <input
        className="create-auction-input"
        type="text"
        placeholder="Titel"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        className="create-auction-input"
        type="text"
        placeholder="Beskrivning"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <input
        className="create-auction-input"
        type="datetime-local"
        placeholder="Slutdatum"
        value={newEndDate}
        onChange={(e) => setNewEndDate(e.target.value)}
      />
      <input
        className="create-auction-input"
        type="number"
        placeholder="Startpris"
        value={newStartingPrice}
        onChange={(e) => setNewStartingPrice(parseFloat(e.target.value))}
      />
      <input
        className="create-auction-input"
        type="text"
        placeholder="Säljare"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
      />
      <button className="create-auction-btn" onClick={createNewAuction}>Skapa auktion</button>
    </div>
  )
}

export default NewAuction