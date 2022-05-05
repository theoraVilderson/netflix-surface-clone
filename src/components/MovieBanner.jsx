import React, { useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./movieBanner.css";

const MovieBanner = (bannerInfoUser) => {
  const [bannerInfo, setBannerInfo] = useState(bannerInfoUser);

  const {
    backdrop,
    title,
    description,
    trailerURL,
    demoToggle = false,
    video,
  } = bannerInfo;

  async function toggleYoutube() {
    let demoToggle = !bannerInfo.demoToggle;
    if (!demoToggle) return setBannerInfo({ ...bannerInfo, demoToggle });

    const lastRes = { ...bannerInfo, demoToggle };
    if (!trailerURL) {
      let trailerURL =
        (await movieTrailer(null, { tmdbId: video.id, id: true })) ??
        (await movieTrailer(title, { id: true }));
      if (!trailerURL) lastRes.demoToggle = false;
      lastRes.trailerURL = trailerURL;
    }
    setBannerInfo(lastRes);
  }
  const youtubeOptions = {
    width: "100%",
    height: "345",
    playerVars: {
      autoplay: 1,
    },
  };
  function truncate(str, limit = 200) {
    return str.length > limit ? str.slice(0, limit) + " ..." : str;
  }
  return (
    <div className="movieBanner">
      <div
        className="movieBanner__movieBannerContainer"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="movieBannerContainer__movieContents">
          <h2>{title}</h2>
          <div className="movieContents__buttons">
            <button onClick={toggleYoutube}>Play</button>
            <button>Add To Watch List</button>
          </div>
          <div className="movieContents__description">
            ${truncate(description)}
          </div>
        </div>
      </div>
      {demoToggle && (
        <YouTube
          className="movieContents__trailer"
          videoId={trailerURL}
          opts={youtubeOptions}
        />
      )}
    </div>
  );
};

export default MovieBanner;
