import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <div>
        <h3 className="card-title text-center my-4">Kontakta oss</h3>
        <h4 className="card-subtitle text-center mb-3 text-body-secondary">
          Välkommen att kontakta en kategorispecialist!
        </h4>
        <div className="container-fluid card contact-text">
          Kontakta våra specialister så hjälper vi dig med värdering och
          försändelse som passar dig bäst. Våra kvalitetsauktioner online äger
          rum 365 dagar om året.
        </div>
        <div className="text-center">
          <img
            className="customer-service img-fluid mt-3"
            alt="customer service"
            src="/assets/customerserviceskills.jpeg.webp"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
