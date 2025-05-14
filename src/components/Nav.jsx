import { NavLink, useLocation } from "react-router-dom";
import "../styles/nav.css";

export const Nav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink
          to="/"
          className={`nav-item nav-link ${pathname === "/" ? "active" : ""}`}
        >
          Newest
        </NavLink>
        <NavLink
          to="/collections"
          className={`nav-item nav-link ${
            pathname === "/collections" ? "active" : ""
          }`}
        >
          Collections
        </NavLink>
        <NavLink
          to="/about"
          className={`nav-item nav-link ${
            pathname === "/about" ? "active" : ""
          }`}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};
