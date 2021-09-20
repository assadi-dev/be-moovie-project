import { useContext, useEffect, useRef } from "react";
import styles from "./Main/style.module.css";
import MovieTrendingPresentation from "../components/MovieTrendingPresentation";
import CarousselGroup from "../components/CarouselGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_users,
  get_notification,
  get_user,
} from "../redux/actions/user.action";
import { useAuthState } from "../utils/context/AuthContext";
import { io } from "socket.io-client";
import { useHistory } from "react-router";
import Flickity from "flickity-fade";
import { getTrendingMovies } from "../redux/actions/movies.action";

const Main = () => {
  const sectionList = [
    { name: "Films Populaires", data: [] },
    { name: "Films à venir", data: [] },
  ];

  const refCarousel = useRef();
  const userId = useAuthState().userId;
  const dispatch = useDispatch();

  const trendingMovie = useSelector(
    (state) => state.TrendingMoviesReducers.collections
  );

  useEffect(() => {
    dispatch(getTrendingMovies());
    dispatch(get_user(userId));
    dispatch(get_all_users());
    let flkty = new Flickity(refCarousel.current, {
      cellAlign: "center",
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      autoPlay: 3500,
      fade: true,
      wrapAround: true,
    });
  }, [userId, dispatch]);

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
              <CarousselGroup />
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default Main;
