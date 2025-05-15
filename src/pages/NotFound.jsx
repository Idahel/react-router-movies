import { Link } from "react-router-dom";
import "../styles/notfound.css";

export const NotFoundPage = () => {
    return (
      <div className="not-found-container">
        <h2>Page not found...</h2>
        <div className="link-container">
        <Link to="/" >
        <span>Show me new releases</span>
        </Link>
        </div>
        </div>
    )
  }