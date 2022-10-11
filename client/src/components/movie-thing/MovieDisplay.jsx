import React from 'react'
import Button from 'react-bootstrap/Button';


function MovieDisplay({ movie, addtolist }) {

  const style = {
    color: movie && movie.Rating && parseInt(movie.Rating) < 50 ? 'red' : 'green'
  }

  const loaded = () => {
    return (
      <div className="movie-display">
        <div className="top-div">
          <h1 className="movie-title">{movie.Title}</h1>
          <span className="add-span">
            
            <Button
              className="add-button"
              onClick={() => addtolist(movie)}
            >✖️</Button>
            watchlist
          </span>
        </div>
        <h2 className="year">
          {movie.Year}
          - Rated {movie.Rated}
        </h2>
        <h2 className="genre">{movie.Genre}</h2>
        {movie.Director && movie.Director !== 'N/A' ?
          <h6 className="director">Directed by {movie.Director}</h6>
          : ''
        }
        <h3 className="awards">{movie.Awards}</h3>
        <blockquote className="plot">
          {movie.Plot}
        </blockquote>
        <img className="poster" src={movie.Poster} alt={movie.Title} />
      </div >
    );
  };

  //function to return loading JSX
  const loading = () => {
    return <h1>No Movie to Display</h1>;
  };

  //Ternary operator will determine which functions JSX we will return
  return movie ? loaded() : loading();
}

export default MovieDisplay