import { useState, useEffect } from 'react';
import MovieDisplay from './MovieDisplay';
import Form from './Form';
import WatchList from './WatchList';
import { useParams } from "react-router-dom";

import './styles/movie-style.css';

function MovieThing() {

  const { id } = useParams();
  const [watchList, setWatchList] = useState([])
  const apiKey = 'e3cb8ca0'
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    console.log(`id = ${id}`);
    getMovie('toast');
  }, [])

  // 🔸🔸🔸
  const addToWatchList = (mov) => {
    // console.log(`add fn : ${JSON.stringify(mov)}`);
    setWatchList((prev) =>
      [...prev, { "movie": mov }]
    );
  }

  // 🔸🔸🔸
  const getMovie = async ({ imdbID, searchTerm }) => {
    const response = await fetch(
      imdbID ?
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
        :
        searchTerm ?
          `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
          :
          `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`

    );
    const data = await response.json();
    // setMovie((data) => data);
    setMovie(data)
    // console.log(`movie: ${JSON.stringify(movie)}`)
  };
  return (
    <div className="movie-layout">
      <div className="main-display">
        <MovieDisplay movie={movie} addtolist={addToWatchList} />
        <Form moviesearch={getMovie} />
      </div>

      <div className="sidebar-rt-display">
        <WatchList watchlist={watchList} moviesearch={getMovie} />
      </div>
    </div>
  )
}

export default MovieThing