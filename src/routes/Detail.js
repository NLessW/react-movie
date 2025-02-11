import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Detail.css"; // Import the CSS file

function Detail() {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
    };
    getMovie();
  }, [id]);

  if (!movie) {
    return null; // Return null if movie data is not yet loaded
  }

  return (
    <div className="detail-container">
      <button
        className="back-button"
        onClick={() => history.push("/react-movie")}
      >
        Back to Home
      </button>
      <div className="detail-images">
        <img
          src={movie.background_image}
          alt={movie.title}
          className="background-image"
        />
      </div>
      <div className="detail-content">
        <h1>{movie.title}</h1>
        <img
          src={movie.large_cover_image}
          alt={movie.title}
          className="thumbnail-image"
        />
        <p className="movie-summary">{movie.description_full}</p>
        <div className="download-buttons">
          {movie.torrents.map((torrent) => (
            <a
              key={torrent.hash}
              href={torrent.url}
              className="download-button"
            >
              Download {torrent.quality} {torrent.size}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
