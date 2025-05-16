import { Link } from "react-router-dom";
import "../styles/notfound.css";

export const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h2>Page not found...</h2>
      <Link
        to="/"
        className="collection-back-link"
        aria-label="Back to homepage"
      >
        <span>Browse Newest</span>
      </Link>
    </div>
  );
};
