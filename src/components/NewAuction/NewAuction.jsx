import "./NewAuction.css";

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
  return (
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
  );
};

export default NewAuction;
