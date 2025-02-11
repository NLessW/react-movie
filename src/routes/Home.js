import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>MovieFlix</h1>
      </header>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <Slider {...settings} className="slider">
            {movies.map((movie) => (
              <div key={movie.id} className="slider-item">
                <img
                  src={movie.background_image}
                  alt={movie.title}
                  className="slider-image"
                />
                <div className="slider-content">
                  <h2 className="slider-title">{movie.title}</h2>
                  <Link to={`/movie/${movie.id}`} className="download-button">
                    Go Download
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                coverImg={movie.medium_cover_image}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
