import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {MovieCard} from '../components/MovieCard';

export const CollectionDetails = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchCollectionMovies = async () => {
      let apiUrl = '';

      if (id === 'documentaries') {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&with_genres=99&sort_by=popularity.desc`;
      } else if (id === 'women-filmmakers') {
        console.log("Fetching movies by Ukrainian women filmmakers...");
        const femaleDirectorIds = ['123', '456', '789'];
        if (femaleDirectorIds.length > 0) {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=uk&with_people=${femaleDirectorIds.join(',')}&sort_by=popularity.desc`;
        } else {
          setMovies([]);
          return;
        }
      }

      if (apiUrl) {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const moviesWithoutDirector = data.results || [];

          const detailedMovies = await Promise.all(
            moviesWithoutDirector.map(async (movie) => {
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
                console.error('Error fetching credits:', error);
                return movie;
              }
            })
          );
          setMovies(detailedMovies);
        } catch (error) {
          console.error(`Error fetching movies for collection ${id}:`, error);
          setMovies([]);
        }
      }
    };

    fetchCollectionMovies();
  }, [id, apiKey]);

  return (
    <div>
      <h2>{id === 'documentaries' ? 'Ukrainian Documentaries' : 'Women Filmmakers of Ukraine'}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
