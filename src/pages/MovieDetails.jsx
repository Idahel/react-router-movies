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
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    // Fetch trailer
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
    <div style={{ padding: "1rem", fontFamily: "serif" }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#eee",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Back to list
      </button>

      {/* Backdrop */}
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        />
      )}

      {movie.original_title !== movie.title && (
        <p
          style={{
            fontSize: "0.9rem",
            color: "#777",
            marginBottom: "0.5rem",
            fontStyle: "italic",
          }}
        >
          {movie.title}
        </p>
      )}

      <h1 style={{ fontSize: "2rem", margin: 0 }}>{movie.original_title}</h1>

      {/* Overview */}
      <p style={{ marginTop: "1rem" }}>{movie.overview}</p>

      {/* Metadata block */}
      <div style={{ marginTop: "1.5rem", lineHeight: 1.6 }}>
        <p>
          <strong>Release date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.runtime} minutes
        </p>
        <p>
          <strong>
            Production country
            {movie.production_countries.length > 1 ? "ies" : ""}:
          </strong>{" "}
          {movie.production_countries.map((c) => c.name).join(", ")}
        </p>
        <p>
          <strong>
            Production compan
            {movie.production_companies.length > 1 ? "ies" : "y"}:
          </strong>{" "}
          {movie.production_companies.map((c) => c.name).join(", ")}
        </p>
        {movie.homepage && (
          <p>
            <strong>Homepage:</strong>{" "}
            <a href={movie.homepage} target="_blank" rel="noreferrer">
              {movie.homepage}
            </a>
          </p>
        )}
      </div>

      {/* Trailer */}
      {trailerKey && (
        <div style={{ marginTop: "2rem" }}>
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
  );
};
