import { useContext, useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "./Main/style.module.css";
import MovieTrendingPresentation from "../components/MovieTrendingPresentation";
import CarousselGroup from "../components/CarouselGroup";
import { useDispatch } from "react-redux";
import {
  get_all_users,
  get_notification,
  get_user,
} from "../redux/actions/user.action";
import { useAuthState } from "../utils/context/AuthContext";
import { io } from "socket.io-client";
import { useHistory } from "react-router";
const Main = () => {
  const sectionList = [
    { name: "Films Populaires", data: [] },
    { name: "Films à venir", data: [] },
  ];

  const history = useHistory();
  const userId = useAuthState().userId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_user(userId));
    dispatch(get_all_users());
  }, [userId, dispatch]);

  return (
    <>
      <header id={styles.header}>
        <MDBCarousel showIndicators fade className={styles.TrendMovieCaroussel}>
          <MDBCarouselInner>
            <MDBCarouselItem itemId={0}>
              <MovieTrendingPresentation />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={1}>
              <MovieTrendingPresentation />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
              <MovieTrendingPresentation />
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
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
