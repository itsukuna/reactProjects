import { useState } from "react";
import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedMovie, setSelectesMovie] = useState<MovieDetails | null>(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  // const baseURL = "https://www.omdbapi.com/?";

  const searchMovies = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      console.log(response.data);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("No movies found. Please try another search");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (imbdID: string) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imbdID}&apikey=${API_KEY}`
      );
      console.log(response.data);
      setSelectesMovie(response.data);
    } catch (error) {
      setError("An error occured while fetching movie details.");
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchMovies(query);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Movie Search App</h2>

      {/* Search Input */}
      <div className="input-group mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
          placeholder="Search for movies"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Movies List */}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                className="card-img-top"
                alt={movie.Title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => fetchMovieDetails(movie.imdbID)}
                  data-bs-toggle="modal"
                  data-bs-target="#movieModal"
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Details Modal */}
      <div
        className="modal fade"
        id="movieModal"
        tabIndex={-1}
        aria-labelledby="movieModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="movieModalLabel">
                {selectedMovie?.Title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedMovie ? (
                <>
                  <p>
                    <strong>Plot:</strong> {selectedMovie.Plot}
                  </p>
                  <p>
                    <strong>Director:</strong> {selectedMovie.Director}
                  </p>
                  <p>
                    <strong>Actors:</strong> {selectedMovie.Actors}
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
