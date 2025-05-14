import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';

export const CollectionDetails = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const desiredMovieCount = 5;

  useEffect(() => {
    const fetchCollectionMovies = async () => {
      if (id === 'women-filmmakers') {
        console.log("Fetching movies by Ukrainian women filmmakers (with gender check)...");
        let allUkrainianMovies = [];
        let page = 1;

        while (allUkrainianMovies.length < 50) {
          try {
            const discoverResponse = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&sort_by=popularity.desc&page=${page}`
            );
            const discoverData = await discoverResponse.json();

            if (!discoverData.results || discoverData.results.length === 0) break;

            allUkrainianMovies = [...allUkrainianMovies, ...discoverData.results];
            page++;
          } catch (error) {
            console.error("Error fetching Ukrainian movies:", error);
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
            const director = creditsData.crew.find((person) => person.job === 'Director');

            if (director) {
              const personResponse = await fetch(
                `https://api.themoviedb.org/3/person/${director.id}?api_key=${apiKey}`
              );
              const personData = await personResponse.json();

              if (personData.gender === 1 && movie.poster_path) {
                potentialFemaleDirectedMovies.push({ ...movie, director: director.name });
              }
            }
            processedMovieCount++;
            console.log(`Processed ${processedMovieCount}/${allUkrainianMovies.length} movies for director gender.`);

          } catch (error) {
            console.error(`Error fetching details for movie ${movie.id}:`, error);
          }
        }

        // **Corrected line: Update the movies state**
        setMovies(potentialFemaleDirectedMovies);

      } else if (id === 'documentaries') {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&with_genres=99&sort_by=popularity.desc`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const documentariesWithDirector = await Promise.all(
            (data.results || []).map(async (movie) => {
              try {
                const creditsRes = await fetch(
                  `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
                );
                const creditsData = await creditsRes.json();
                const director = creditsData.crew.find(
                  (person) => person.job === 'Director'
                );
                return { ...movie, director: director ? director.name : 'Unknown' };
              } catch (error) {
                console.error('Error fetching credits for documentary:', error);
                return movie;
              }
            })
          );
          setMovies(documentariesWithDirector);
        } catch (error) {
          console.error("Error fetching Ukrainian documentaries:", error);
          setMovies([]);
        }
      }
    };

    fetchCollectionMovies();
  }, [id, apiKey]);

  return (
    <div>
      <h2>{id === 'documentaries' ? 'Ukrainian Documentaries' : 'Women Filmmakers of Ukraine'}</h2>
      <div>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
