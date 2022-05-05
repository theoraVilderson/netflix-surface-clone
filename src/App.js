import Row from "./components/RowMovieList";
import movieFetchList from "./movieFetchList";
import "./components/global.css";
import MovieBannerRandom from "./components/MovieBannerRandom";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="App">
      <Nav />
      <MovieBannerRandom />
      <Row
        name="Netflix Originals"
        isLarge
        fetchURL={movieFetchList.netflixOrigins}
      />
      <Row name="Trending Now" fetchURL={movieFetchList.trending} />
      <Row name="TOP Rated" fetchURL={movieFetchList.topRated} />
      <Row name="Action Movies" fetchURL={movieFetchList.actionMovies} />
      <Row name="Comedy Movies" fetchURL={movieFetchList.comedyMovies} />
      <Row name="Horror Movies" fetchURL={movieFetchList.horrorMovies} />
      <Row name="Romance Movies" fetchURL={movieFetchList.romanceMovies} />
      <Row name="Documentaries" fetchURL={movieFetchList.documentaries} />
    </div>
  );
}

export default App;
