const Footer = () => {
  return (
    <div className="footer footer-expand-lg footer-light pt-4">
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <a href="#">
          <ion-icon name="logo-facebook"></ion-icon>
        </a>

        <a href="#">
          <ion-icon name="logo-instagram" href="#" cursor="pointer"></ion-icon>
        </a>

        <a href="#">
          <ion-icon name="logo-youtube" href="#" cursor="pointer"></ion-icon>
        </a>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <p> &copy;2024 Auctioneer</p>
      </div>
    </div>
  );
};

export default Footer;
