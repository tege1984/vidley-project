import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/pagination";
class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    console.log("like icon cliked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePagination = (pageCount, pageLimit, movies) => {
    const moviesInPage = movies.slice(
      pageCount * pageLimit - pageLimit,
      pageCount * pageLimit
    );
    this.setState({ movies: moviesInPage });
    console.log(moviesInPage);
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <React.Fragment>
        <p>Showing {count} movies are the database.</p>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Gener</th>
              <th>Stoke</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  {" "}
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />{" "}
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm m-2"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          movies={this.state.movies}
          onClick={this.handlePagination}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
