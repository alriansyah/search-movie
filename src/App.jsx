import './App.css';
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from 'react';


const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    })
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">
            <h1>{movie.title}</h1>
          </div>
          <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" className="Movie-image" />
          <div className="Movie-date">Release: {movie.release_date}</div>
          <div className="Movie-rate">Rate: {movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if(q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  }

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        <h1>SearchMovie</h1>
        <input
          placeholder='Cari film kesayangan.......'
          className='Movie-search'
          type=""
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
