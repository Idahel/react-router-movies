import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <Link to={`/movies/${movie.id}`}>
          <img
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
        </Link>
      </div>
      <div className="movie-content">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-director">Directed by {movie.director}</p>
      </div>
    </div>
  );
};
