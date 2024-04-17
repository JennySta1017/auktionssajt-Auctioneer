import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./NewAuction.css";
import Button from 'react-bootstrap/Button'; 
const NewAuction = ({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  newEndDate,
  setNewEndDate,
  newStartingPrice,
  setNewStartingPrice,
  seller,
  setSeller,
  createNewAuction,
}) => {
  const navigate = useNavigate();

  // Handler for the back button
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <Button className="m-1" variant="outline-primary" onClick={handleBackClick}>
        {' <<'} Tillbaka
      </Button>
      <div className="container">
        <h1>Skapa ny auktion</h1>
        <hr />
        <label>Titel på auktion</label>
        <input
          className="create-auction-input"
          type="text"
          placeholder="Titel"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label>Beskrivning av auktion</label>
        <input
          className="create-auction-input"
          type="text"
          placeholder="Beskrivning"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <label>Slutdatum på auktionen</label>
        <input
          className="create-auction-input"
          type="datetime-local"
          placeholder="Slutdatum"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
        />
        <label>Startpris/startbud</label>
        <input
          className="create-auction-input"
          type="number"
          placeholder="Startpris"
          value={newStartingPrice}
          onChange={(e) => setNewStartingPrice(parseFloat(e.target.value))}
        />
        <label>Säljare (namn)</label>
        <input
          className="create-auction-input"
          type="text"
          placeholder="Säljare"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        <button className="create-auction-btn" onClick={createNewAuction}>
          Skapa auktion
        </button>
      </div>
    </>
  );
};

export default NewAuction;