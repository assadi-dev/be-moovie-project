import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import FavorisButton from "../HeaderMedia/FavorisButton";
import { Link } from "react-router-dom";

const MovieTrendingPresentation = ({ id }) => {
  const urlImg = `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces`;
  const [isLoading, setIsLoading] = useState(false);
  const [dataMovie, setDataMovie] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=af3bb285b6a9f371e3eee1507dba9d06&language=fr-FR&region=FR`
      )
      .then((res) => {
        setDataMovie(res.data);
        const genreList = [];

        res.data.genres.forEach((e) => {
          genreList.push(e.name);
        });
        setGenre(genreList.join(", "));
        setIsLoading(true);
      });
  }, [id, isLoading]);

  return (
    <div
      className={styles.parentItem}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), #161616) ,url(${
          urlImg + dataMovie.backdrop_path
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
            <h5 className={styles.titleMovie}>{dataMovie.title}</h5>
            <p className={styles.genre}>
              <MDBIcon className="me-2" far icon="calendar-alt" />{" "}
              {dataMovie.release_date}
            </p>
            <p className={styles.genre}>
              <MDBIcon className="me-2" fas icon="list" />
              {genre}
            </p>
            <p className={styles.tagLine}>{dataMovie.tagline}</p>
            <div className={styles.btnZone}>
              <MDBBtn color="danger"> Créer un post </MDBBtn>{" "}
              <FavorisButton id={id} />
              <MDBBtn outline color="white">
                <MDBIcon className="me-2" fas icon="play" />
                <Link to={`/movie/${id}`}>Details</Link>
              </MDBBtn>
            </div>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default MovieTrendingPresentation;
