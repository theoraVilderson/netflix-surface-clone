import React, { useState, useEffect } from "react";
import axios from "../axios";
import MovieBanner from "./MovieBanner";
import movieFetchList, { imgBaseURL } from "../movieFetchList";

const MovieBannerRandom = () => {
  const [movie, setMovie] = useState({
    backdrop: "",
    title: "",
    description: "",
    video: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const randMovieType =
          movieFetchList[
            Object.keys(movieFetchList).sort((a, b) => Math.random() - 0.5)[0]
          ];
        const movies = await axios.get(randMovieType);
        const randMovie = movies.data.results.sort(
          (a, b) => Math.random() - 0.5
        )[0];
        const video = randMovie;
        const backdrop =
          imgBaseURL + (video.backdrop_path ?? video.poster_path);
        const title = video.name || video.title || video.original_name;
        const description = video.overview;
        setMovie((pervInfo) => {
          return { ...pervInfo, video, backdrop, title, description };
        });
      } catch (error) {}
    })();
  }, []);

  return <>{movie.video && <MovieBanner {...movie} />}</>;
};

export default MovieBannerRandom;
