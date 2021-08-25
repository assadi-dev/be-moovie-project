import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const HeaderMedia = () => {
  return (
    <>
      <header className={classNames(styles.headerPresentation, styles.header)}>
        <div className={styles.overlay}> </div>
        <div className={styles.container}>
          <div style={styles.info}>
            <h5 className={styles.titleMovie}>Free Guy</h5>
            <p className={styles.genre}>
              <MDBIcon className="me-2" far icon="calendar-alt" /> 28/07/2021
            </p>
            <p className={styles.genre}>
              <MDBIcon className="me-2" fas icon="list" />
              Action, Aventure, Fantastique, Comédie
            </p>
            <p className={styles.tagLine}>
              Le monde a besoin d'un héros. C'est tombé sur lui.
            </p>
            <div>
              <MDBBtn color="danger"> Créer un post </MDBBtn>{" "}
              <MDBBtn outline color="white">
                {" "}
                <MDBIcon className="me-2" far icon="heart" />
                Ajouter à mes favoris
              </MDBBtn>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMedia;
