import { useEffect, useRef, useState } from "react";
import styles from "./Main/style.module.css";
import MovieTrendingPresentation from "../components/MovieTrendingPresentation";
import CarousselGroup from "../components/CarouselGroup";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users, get_user } from "../redux/actions/user.action";
import { useAuthState } from "../utils/context/AuthContext";
import Flickity from "flickity-fade";
import {
  getPopularMovie,
  getTrendingMovies,
  getUpcomingmovie,
} from "../redux/actions/movies.action";

const Main = () => {
  const refCarousel = useRef();
  const userId = useAuthState().userId;
  const dispatch = useDispatch();

  const trendingMovie = useSelector(
    (state) => state.TrendingMoviesReducers.collections
  );
  const pouplarMovies = useSelector(
    (state) => state.PopularMoviesReducers.collections
  );
  const upcomingMovies = useSelector(
    (state) => state.UpcomingMoviesReducers.collections
  );

  const [sectionList, setSectionList] = useState([
    { name: "Films Populaires", data: pouplarMovies },
    { name: "Films à venir", data: upcomingMovies },
  ]);

  useEffect(() => {
    dispatch(getTrendingMovies());
    dispatch(get_user(userId));
    dispatch(get_all_users());
    dispatch(getPopularMovie());
    dispatch(getUpcomingmovie());
    const flkty = new Flickity(refCarousel.current, {
      cellAlign: "center",
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      autoPlay: 3500,
      fade: true,
      wrapAround: true,
    });
  }, [dispatch, userId]);

  return (
    <>
      <header id={styles.header}>
        <div ref={refCarousel} className={styles.trendingCarousel}>
          {trendingMovie.map((movie) => (
            <MovieTrendingPresentation
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              title={movie.title}
            />
          ))}
        </div>
      </header>
      <main id={styles.main}>
        {sectionList.map((section, index) => (
          <section key={index} className={styles.movieSection}>
            <div className={styles.headerSection}>
              <h5 className={styles.headerSectionTitle}>{section.name}</h5>
              <hr className={styles.separator} />
            </div>
            <div>
              <CarousselGroup movies={section.data} />
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default Main;
