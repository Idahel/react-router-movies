import { useState } from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, from = "newest" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <Link to={`/movies/${movie.id}`} state={{ from }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            srcSet={`
    https://image.tmdb.org/t/p/w500${movie.backdrop_path} 500w,
    https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
    https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w,
    https://image.tmdb.org/t/p/original${movie.backdrop_path} 2000w
  `}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
            alt={movie.title}
            className={`movie-image ${isLoaded ? "loaded" : ""}`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </Link>
      </div>
      <div className="movie-content">
        <Link to={`/movies/${movie.id}`} state={{ from }}>
          <h2 className="movie-title">{movie.title}</h2>
        </Link>
        <p className="movie-director">Directed by {movie.director}</p>
      </div>
    </div>
  );
};
