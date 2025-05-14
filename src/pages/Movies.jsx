import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        console.log("Initial API Data (Page", page, "):", data); // Lägg till denna rad

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
    <div>
      <h1>Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: "8px", maxWidth: "200px" }}
              />
            </Link>
            <p>{movie.title}</p>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              Directed by {movie.director}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
