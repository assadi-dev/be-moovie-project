import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import HeaderMedia from "../../components/HeaderMedia";
import SeparatorTitleStyle from "../../components/separatortitleStyle";
import TabsMedia from "../../components/TabsMedias";
import axios from "axios";
import YouTube from "react-youtube";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Movie = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [genres, setGenre] = useState();
  const posterImgUrl = `https://www.themoviedb.org/t/p/w1280${movieDetail.poster_path}`;
  const [trailers, setTrailers] = useState();

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: false,
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&region=FR`
      )
      .then((res) => {
        setMovieDetail(res.data);
        const genreList = [];

        res.data.genres.forEach((e) => {
          genreList.push(e.name);
        });
        setGenre(genreList.join(", "));
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&region=FR`
      )
      .then((res) => {
        if (res.data.results.length > 0) {
          setTrailers(res.data.results[0].key);
        } else setTrailers("");
      });
  }, [id]);

  return (
    <>
      <HeaderMedia
        idMovie={movieDetail.id}
        title={movieDetail.title}
        genres={genres}
        tagline={movieDetail.tagline}
        release={movieDetail.release_date}
        backdrop={movieDetail.backdrop_path}
        toggleShow={toggleShow}
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
      <MDBModal
        tabIndex="-1"
        show={centredModal}
        getOpenState={(e: any) => setCentredModal(e)}
      >
        <MDBModalDialog centered>
          <MDBModalContent className={styles.vdeiCardContent}>
            <MDBModalBody className={styles.vdeiCardContent}>
              {trailers !== "" ? (
                <YouTube videoId={trailers} opts={opts} />
              ) : (
                <YouTube videoId="" opts={opts} />
              )}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Movie;
