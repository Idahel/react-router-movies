import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import "../styles/movies.css";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];
      let page = 1;

      while (allMovies.length < 20) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&sort_by=release_date.desc&page=${page}`
        );
        const data = await res.json();

        // Avsluta om vi når slutet av tillgängliga resultat
        if (!data.results || data.results.length === 0) break;

        // Hämta regissör för varje film
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
              return null; // hoppa över trasiga filmer
            }
          })
        );

        // Filtrera bort trasiga, saknade bilder eller null
        const filtered = detailedMovies.filter(
          (m) => m && m.poster_path && m.backdrop_path
        );

        allMovies = [...allMovies, ...filtered];
        page++;
      }

      setMovies(allMovies.slice(0, 20)); // exakt 20 st
    };

    fetchMovies();
  }, []);


  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
