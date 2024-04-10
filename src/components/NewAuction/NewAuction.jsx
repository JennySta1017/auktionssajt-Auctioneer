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
      <button className="create-auction-btn" onClick={createNewAuction}>
        Skapa auktion
      </button>
    </div>
  );
};

export default NewAuction;
