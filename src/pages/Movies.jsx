import { useEffect, useState } from "react"

export const Movies = () => {
  const [movies, setMovies] = useState([])
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&page=2`)
      .then((response) => response.json())
      .then((data) => {
        const moviePromises = data.results.map((movie) =>
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((credits) => {
              const director = credits.crew.find((person) => person.job === "Director")
              return {
                ...movie,
                director: director ? director.name : "Unknown",
              }
            })
        )
      
        Promise.all(moviePromises).then((moviesWithDirectors) => {
          setMovies(moviesWithDirectors)
        })
      })
  }, [])

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ borderRadius: "8px", maxWidth: "200px" }}
            />
            <p>{movie.title}</p>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              Directed by {movie.director}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
