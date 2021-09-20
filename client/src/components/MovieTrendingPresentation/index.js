import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";

const MovieTrendingPresentation = ({
  id,
  classname,
  backdrop_path,
  title,
  release_date,
}) => {
  const urlImg = `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces`;

  return (
    <div
      className={styles.parentItem}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), #161616) ,url(${
          urlImg + backdrop_path
        })`,
      }}
    >
      {/*<MDBCarouselElement
        className={styles.picture}
        src={urlImg + backdrop_path}
        alt={`${title}`}
     />*/}
      <MDBContainer>
        <div className={styles.presentation}>
          <div style={styles.info}>
            <h5 className={styles.titleMovie}>{title}</h5>
            <p className={styles.genre}>
              <MDBIcon className="me-2" far icon="calendar-alt" />{" "}
              {release_date}
            </p>
            <p className={styles.genre}>
              <MDBIcon className="me-2" fas icon="list" />
              Action, Aventure, Fantastique, Comédie
            </p>
            <p className={styles.tagLine}>
              Le monde a besoin d'un héros. C'est tombé sur lui.
            </p>
            <div className={styles.btnZone}>
              <MDBBtn color="danger"> Créer un post </MDBBtn>{" "}
              <MDBBtn outline color="white">
                {" "}
                <MDBIcon className="me-2" far icon="heart" />
                Ajouter à mes favoris
              </MDBBtn>{" "}
              <MDBBtn outline color="white">
                <MDBIcon className="me-2" fas icon="play" />
                Details
              </MDBBtn>
            </div>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default MovieTrendingPresentation;
