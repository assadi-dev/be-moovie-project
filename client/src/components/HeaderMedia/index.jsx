import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const HeaderMedia = ({
  title,
  release,
  tagline,
  genres,
  backdrop,
  toggleShow,
}) => {
  const imgUrl = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop}`;

  return (
    <>
      <header
        className={classNames(styles.headerPresentation, styles.header)}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), #262626), url(${imgUrl})`,
        }}
      >
        <div className={styles.container}>
          <div style={styles.info}>
            <h5 className={styles.titleMovie}>{title}</h5>
            <p className={styles.genre}>
              <MDBIcon className="me-2" far icon="calendar-alt" /> {release}
            </p>
            <p className={styles.genre}>
              <MDBIcon className="me-2" fas icon="list" />
              {genres}
            </p>
            <p className={styles.tagLine}>{tagline}</p>
            <div>
              <MDBBtn color="danger"> Créer un post </MDBBtn>{" "}
              <MDBBtn outline color="white">
                <MDBIcon className="me-2" far icon="heart" />
                Ajouter à mes favoris
              </MDBBtn>
              <MDBBtn outline color="white" onClick={toggleShow}>
                <MDBIcon className="me-2" fas icon="play" />
                Voir la bande annonce
              </MDBBtn>
            </div>
          </div>
        </div>

        <div className={styles.banner__fadeBottom}> </div>
      </header>
    </>
  );
};

export default HeaderMedia;
