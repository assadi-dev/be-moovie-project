import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFavoris } from "../../redux/actions/movies.action";

const PosterFavoris = ({ id }) => {
  const [movieDetail, setMovieDetail] = useState({
    poster_path: "",
    title: "",
  });

  const dispatch = useDispatch();

  const removeToFavorie = () => {
    dispatch(removeFavoris(id));
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&region=FR`
      )
      .then((res) => {
        setMovieDetail({
          ...movieDetail,
          title: res.data.title,
          poster_path: res.data.poster_path,
        });
      });
  }, [id]);

  const posterImgUrl = `https://www.themoviedb.org/t/p/w1280${movieDetail.poster_path}`;

  return (
    <>
      <div className={styles.posterFavorisWrapper}>
        <Link to={`/movie/${id}`}>
          <img
            className={styles.posterFavoris}
            src={posterImgUrl}
            alt="poster"
            srcset=""
          />
        </Link>
        <MDBIcon
          className={styles.favorisBtn}
          fas
          icon="times-circle"
          onClick={removeToFavorie}
        />
      </div>
    </>
  );
};

export default PosterFavoris;
