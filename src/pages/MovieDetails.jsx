import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/moviedetails.css";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      });
  }, [id, apiKey]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      {/* Hero section */}
      <div className="movie-hero">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>

        {movie.backdrop_path && (
          <img
            className="movie-hero-bg"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}

        <div className="movie-hero-content">
          <h1 className="movie-hero-title">{movie.original_title}</h1>
          {movie.original_title !== movie.title && (
            <p className="movie-subtitle">{movie.title}</p>
          )}
        </div>
      </div>

      {/* Info block */}
      <div className="movie-info">
        <div className="movie-info-grid">
          <div className="movie-info-item">
            <div className="movie-info-label">Release date</div>
            <div className="movie-info-value">
              {movie.release_date || "Unknown"}
            </div>
          </div>

          <div className="movie-info-item">
            <div className="movie-info-label">Runtime</div>
            <div className="movie-info-value">
              {movie.runtime ? `${movie.runtime} min` : "Unknown"}
            </div>
          </div>

          <div className="movie-info-item">
            <div className="movie-info-label">Production country</div>
            <div className="movie-info-value">
              {movie.production_countries &&
              movie.production_countries.length > 0
                ? movie.production_countries.map((c) => c.name).join(", ")
                : "Unknown"}
            </div>
          </div>

          <div className="movie-info-item">
            <div className="movie-info-label">Production company</div>
            <div className="movie-info-value">
              {movie.production_companies &&
              movie.production_companies.length > 0
                ? movie.production_companies.map((c) => c.name).join(", ")
                : "Unknown"}
            </div>
          </div>

          {movie.homepage && (
            <div className="movie-info-item">
              <div className="movie-info-label">Homepage</div>
              <div className="movie-info-value">
                <a href={movie.homepage} target="_blank" rel="noreferrer">
                  {movie.homepage}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Overview */}
        <div className="movie-synopsis">
          <h2>Synopsis</h2>
          <p>{movie.overview}</p>
        </div>

        {/* Trailer */}
        {trailerKey && (
          <div className="movie-trailer">
            <h2>Trailer</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
