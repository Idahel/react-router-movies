import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import "../styles/movies.css";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let allMovies = [];
      let page = 1;

      while (allMovies.length < 20) {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&sort_by=release_date.desc&page=${page}`
          );
          const data = await res.json();

          // Exit if we reach the end of available results
          if (!data.results || data.results.length === 0) break;

          // Fetch director for each movie
          const detailedMovies = await Promise.all(
            data.results.map(async (movie) => {
              try {
                const res = await fetch(
                  `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
                );
                const credits = await res.json();
                const director = credits.crew.find((p) => p.job === "Director");

                return {
                  ...movie,
                  director: director ? director.name : "Unknown",
                };
              } catch (err) {
                console.error("Failed to fetch credits:", err);
                return null; // Skip broken movies
              }
            })
          );

          // Filter out movies that are not yet released
          const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

          // Filter out broken, missing images, null, or future releases
          const filtered = detailedMovies.filter(
            (m) =>
              m &&
              m.poster_path &&
              m.backdrop_path &&
              m.release_date &&
              m.release_date <= today
          );

          allMovies = [...allMovies, ...filtered];
          page++;
        } catch (error) {
          console.error("Error fetching movies:", error);
          break;
        }
      }

      setMovies(allMovies.slice(0, 20)); // Exactly 20 movies
      setLoading(false);
    };

    fetchMovies();
  }, [apiKey]);

  return (
    <div className="movies-container">
      <h1 className="movies-title">Newest</h1>
      {loading ? (
        <div className="movies-loading" aria-live="polite">
          Loading movies...
        </div>
      ) : (
        movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} from="newest" />
        ))
      )}
    </div>
  );
};
