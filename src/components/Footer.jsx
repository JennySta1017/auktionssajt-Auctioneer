const Footer = () => {
  return (
    <div
      className="footer footer-expand-lg py-2"
      style={{ backgroundColor: " #d2691e" }}
    >
      <div
        className="d-flex justify-content-center align-items-center flex-wrap"
        style={{ fontSize: "12px" }}
      >
        <a href="#" style={{ margin: "3px" }}>
          <ion-icon name="logo-facebook"></ion-icon>
        </a>

        <a href="#" style={{ margin: "3px" }}>
          <ion-icon name="logo-instagram" href="#" cursor="pointer"></ion-icon>
        </a>

        <a href="#" style={{ margin: "3px" }}>
          <ion-icon name="logo-youtube" href="#" cursor="pointer"></ion-icon>
        </a>
      </div>
      <div
        className="d-flex justify-content-center align-items-center flex-wrap"
        style={{ marginTop: "-6px", marginBottom: "-13px", fontSize: "11px" }}
      >
        <p> &copy;2024 Auctioneer</p>
      </div>
    </div>
  );
};

export default Footer;
