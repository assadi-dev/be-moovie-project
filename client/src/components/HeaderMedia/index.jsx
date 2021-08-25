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
            <h5 style={styles.titleMovie}>Free Guy</h5>
            <span>28/07/2021 ,Action, Aventure, Fantastique, Comédie</span>
            <div>
              <MDBBtn color="secondary"> Créer un post </MDBBtn>{" "}
              <MDBBtn outline color="white">
                {" "}
                <MDBIcon className="me-2" far icon="heart" />
                Ajouter à mes favoris
              </MDBBtn>
              <p>Le monde a besoin d'un héros. C'est tombé sur lui.</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMedia;
