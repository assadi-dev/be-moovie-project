import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import HeaderMedia from "../../components/HeaderMedia";
import SeparatorTitleStyle from "../../components/separatortitleStyle";
import TabsMedia from "../../components/TabsMedias";
import axios from "axios";

const Movie = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [genres, setGenre] = useState();
  const posterImgUrl = `https://www.themoviedb.org/t/p/w1280${movieDetail.poster_path}`;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=af3bb285b6a9f371e3eee1507dba9d06&language=fr-FR&region=FR`
      )
      .then((res) => {
        setMovieDetail(res.data);
        const genreList = [];

        res.data.genres.forEach((e) => {
          genreList.push(e.name);
        });
        setGenre(genreList.join(", "));
      });
  }, []);

  return (
    <>
      <HeaderMedia
        title={movieDetail.title}
        genres={genres}
        tagline={movieDetail.tagline}
        release={movieDetail.release_date}
        backdrop={movieDetail.backdrop_path}
      />

      <main className={styles.sectionContent}>
        <div className={styles.leftCol}>
          {" "}
          <div className={styles.pictureContent}>
            <img src={posterImgUrl} alt={`${movieDetail.title}`} />
          </div>
        </div>
        <div className={styles.mainCol}>
          <section className={styles.previewContainer}>
            <SeparatorTitleStyle title="Synopsis" />
            <p className={styles.synopsis}>{movieDetail.overview}</p>
          </section>

          <section className={styles.previewContainer}>
            <SeparatorTitleStyle
              title="Pour vous"
              style={{ marginTop: "15%" }}
            />

            <TabsMedia movieId={id} />
          </section>
        </div>
        <div className={styles.rightCol}></div>
      </main>
    </>
  );
};

export default Movie;
