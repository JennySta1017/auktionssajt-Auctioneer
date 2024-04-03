import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light d-flex justify-content-between px-2"
      style={{ backgroundColor: "#d2691e", fontSize: "1em" }}
    >
      <NavLink
        to="/"
        className="navbar-brand"
        style={{ fontFamily: "cursive" }}
      >
        Auctioneer
      </NavLink>

      <ul className="navbar-nav d-flex flex-row justify-content-center gap-2">
        <li className="nav-item active">
          <NavLink to="/" className="nav-link">
            Auktioner
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" className="nav-link">
            Kontakt
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
