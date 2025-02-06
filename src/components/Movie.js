import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Movie.css"; // Import the CSS file

function Movie({ id, title, summary, genres, coverImg }) {
  return (
    <div className="movie">
      <Link to={`/movie/${id}`}>
        <div className="movie-image-container">
          <img src={coverImg} alt={title} className="movie-image" />
          <div className="movie-overlay">
            <h3 className="movie-title">{title}</h3>
            <p className="movie-summary">
              {summary.length > 100 ? `${summary.slice(0, 100)}...` : summary}
            </p>
            <ul className="movie-genres">
              {genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  coverImg: PropTypes.string.isRequired,
};

export default Movie;
