import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import "../styles/collectiondetails.css";

export const CollectionDetails = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const desiredMovieCount = 5;

  

  useEffect(() => {
    const fetchCollectionMovies = async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      let fetchedMovies = [];

      if (id === "women-filmmakers") {
        console.log(
          "Fetching movies by Ukrainian women filmmakers (with gender check)..."
        );
        let allUkrainianMovies = [];
        let page = 1;

        while (allUkrainianMovies.length < 50) {
          try {
            const discoverResponse = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&sort_by=popularity.desc&page=${page}`
            );
            const discoverData = await discoverResponse.json();

            if (!discoverData.results || discoverData.results.length === 0)
              break;

            allUkrainianMovies = [
              ...allUkrainianMovies,
              ...discoverData.results,
            ];
            page++;
          } catch (error) {
            console.error("Error fetching Ukrainian movies:", error);
            setLoading(false);
            return;
          }
        }

        const potentialFemaleDirectedMovies = [];
        let processedMovieCount = 0;

        for (const movie of allUkrainianMovies) {
          if (potentialFemaleDirectedMovies.length >= desiredMovieCount) break;

          try {
            const creditsResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
            );
            const creditsData = await creditsResponse.json();
            const director = creditsData.crew.find(
              (person) => person.job === "Director"
            );

            if (director) {
              const personResponse = await fetch(
                `https://api.themoviedb.org/3/person/${director.id}?api_key=${apiKey}`
              );
              const personData = await personResponse.json();

              if (personData.gender === 1) {
                potentialFemaleDirectedMovies.push({
                  ...movie,
                  director: director.name,
                });
              }
            }
            processedMovieCount++;
            console.log(
              `Processed ${processedMovieCount}/${allUkrainianMovies.length} movies for director gender.`
            );
          } catch (error) {
            console.error(
              `Error fetching details for movie ${movie.id}:`,
              error
            );
          }
        }
        fetchedMovies = potentialFemaleDirectedMovies;
      } else if (id === "documentaries") {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&with_genres=99&sort_by=popularity.desc`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          fetchedMovies = await Promise.all(
            (data.results || []).map(async (movie) => {
              try {
                const creditsRes = await fetch(
                  `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
                );
                const creditsData = await creditsRes.json();
                const director = creditsData.crew.find(
                  (person) => person.job === "Director"
                );
                return {
                  ...movie,
                  director: director ? director.name : "Unknown",
                };
              } catch (error) {
                console.error("Error fetching credits for documentary:", error);
                return movie;
              }
            })
          );
        } catch (error) {
          console.error("Error fetching Ukrainian documentaries:", error);
          setMovies([]);
          setLoading(false);
          return;
        }
      }

      // Filtrera bort filmer utan poster_path och backdrop_path
      const filteredMovies = fetchedMovies.filter(
        (movie) => movie && movie.poster_path && movie.backdrop_path
      );

      setMovies(filteredMovies);
      setLoading(false);
    };

    fetchCollectionMovies();
  }, [id, apiKey]);

  const getCollectionTitle = () => {
    return id === "documentaries"
      ? "Ukrainian Documentaries"
      : "Women Filmmakers of Ukraine";
  };

  const getCollectionDescription = () => {
    return id === "documentaries"
      ? "Explore the rich tapestry of Ukrainian life, history, and culture through compelling and insightful documentary films."
      : "Discover powerful and poignant films directed by talented women from Ukraine, showcasing their unique perspectives and storytelling.";
  };

  return (
    <div className="collection-details-container">
      <Link to="/collections" className="collection-back-link">
        <span>Back to Collections</span>
      </Link>

      <div className="collection-hero">
        <div>
          <h2 className="collection-details-title">{getCollectionTitle()}</h2>
          <p className="collection-description">{getCollectionDescription()}</p>
          <div className="collection-stats">
            <span>{movies.length} films</span>
            <span>Curated collection</span>
          </div>
        </div>
        {/* <div>Bild eller något mer innehåll kan läggas här</div> */}
      </div>

      {loading ? (
        <div className="collection-loading">Loading collection...</div>
      ) : movies.length > 0 ? (
        <div className="collection-movie-list">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      ) : (
        <div className="collection-empty">
          No films found in this collection.
        </div>
      )}
    </div>
  );
};