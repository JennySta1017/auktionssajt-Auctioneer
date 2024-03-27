import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light d-flex justify-content-between px-3"
      style={{ backgroundColor: "#d2691e", fontSize: "1em" }}
    >
      <NavLink
        to="/"
        className="navbar-brand"
        style={{ fontFamily: "cursive" }}
      >
        Auctioneer
      </NavLink>

      <ul className="navbar-nav d-flex flex-row justify-content-center gap-3">
        <li className="nav-item active">
          <NavLink to="/" className="nav-link">
            Köpa
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/selling" className="nav-link">
            Sälja
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
