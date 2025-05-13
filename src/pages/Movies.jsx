import { useEffect } from "react"

export const Movies = () => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

/// fetch movies, use UseEffect
useEffect (() => {
    fetch (`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data.results))
    .catch((error) => console.log(error))
})

  return (
    <div>Movies</div>
  )
}
