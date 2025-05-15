import { NavLink, useLocation } from "react-router-dom";
import "../styles/nav.css";

export const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const fromState = location.state?.from;

  const isMoviePage = pathname.startsWith("/movies");

  const isNewest =
    pathname === "/" ||
    (!fromState && isMoviePage) ||
    (fromState === "newest" && isMoviePage);

  const isCollections =
    pathname.startsWith("/collections") ||
    (fromState === "collections" && isMoviePage);

  const isAbout = pathname === "/about";

  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink
          to="/"
          className={`nav-item nav-link ${isNewest ? "active" : ""}`}
        >
          Newest
        </NavLink>
        <NavLink
          to="/collections"
          className={`nav-item nav-link ${isCollections ? "active" : ""}`}
        >
          Collections
        </NavLink>
        <NavLink
          to="/about"
          className={`nav-item nav-link ${isAbout ? "active" : ""}`}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};
