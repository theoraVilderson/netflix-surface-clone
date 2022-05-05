import { useEffect, useState } from "react";
import axios from "../axios";
import "./row.css";
import { imgBaseURL } from "../movieFetchList";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const RowMovieList = ({ name, fetchURL, isLarge }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovie() {
      let movies = [];
      if (!fetchURL) return;

      try {
        movies = await axios.get(fetchURL);
      } catch (e) {}
      setMovies(movies.data.results);
    }
    fetchMovie();
  }, [fetchURL]);
  const [trailerInfo, setTrailerInfo] = useState({
    videoId: null,
    toggleTrailer: false,
    videosId: {},
  });
  const { videoId, toggleTrailer } = trailerInfo;
  async function toggleYoutube(e) {
    const target =
      e.target.matches(".rowItems__rowItem") ||
      e.target.closest(".rowItems__rowItem");
    const currentVideoTitle = target.title;
    const currentTMDBId = target.getAttribute("videoid");
    const perviousVideoId = trailerInfo.videoId;
    let toggleTrailer = trailerInfo.toggleTrailer;
    const videosId = trailerInfo.videosId;
    const isSameMovie = videosId[currentTMDBId] == perviousVideoId;
    toggleTrailer = !toggleTrailer;
    if (!isSameMovie) toggleTrailer = true;

    const lastRes = { toggleTrailer };
    if (!isSameMovie || !videoId) {
      let videoId =
        (await movieTrailer(null, { tmdbId: currentTMDBId, id: true })) ??
        (await movieTrailer(currentVideoTitle, { id: true }));
      if (!videoId) lastRes.toggleTrailer = false;
      videosId[currentTMDBId] = lastRes.videoId = videoId;
      lastRes.videosId = videosId;
    }

    setTrailerInfo((info) => {
      return { ...info, ...lastRes };
    });
  }
  const youtubeOptions = {
    width: "100%",
    height: "445",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="row">
      <h2>{name.toUpperCase()}</h2>
      <div
        className={`row__rowItems row__rowItems${isLarge ? "--big" : "--box"}`}
      >
        {movies.map((movie) => {
          const imgURL =
            imgBaseURL + (isLarge ? movie.backdrop_path : movie.poster_path);
          const movieName = movie.name || movie.title || movie.original_name;
          return (
            <div
              key={movie.id}
              onClick={toggleYoutube}
              className="rowItems__rowItem"
              title={movieName}
              videoid={movie.id}
            >
              <img className="rowItem__poster" src={imgURL} alt={movieName} />
            </div>
          );
        })}
      </div>
      {toggleTrailer && (
        <YouTube
          className="movieContents__trailer"
          videoId={videoId}
          opts={youtubeOptions}
        />
      )}
    </div>
  );
};

export default RowMovieList;
