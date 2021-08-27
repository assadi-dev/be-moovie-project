import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

const EditProfile = () => {
  return (
    <div className={styles.editProfileWrapper}>
      <div className={styles.sectionPresentation}>
        <form
          className={classNames(styles.formPresentation, styles.formApparence)}
        >
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="user" />
            </MDBInputGroupText>
            <MDBInputGroupElement type="text" placeholder="Pseudo" />
          </MDBInputGroup>
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon fas icon="at" />
            </MDBInputGroupText>
            <MDBInputGroupElement type="email" placeholder="Adresse email" />
          </MDBInputGroup>
          <MDBInputGroup>
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="address-card" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              textarea
              type="text"
              placeholder="Présentation"
            />
          </MDBInputGroup>
          <div className={styles.messageZone}>
            <p>Erreur</p>
          </div>
          <div className={styles.submitZone}>
            <MDBBtn color="info" type="submit">
              Enregistrer
            </MDBBtn>
          </div>
        </form>
        <hr />
        <h5>Changez de Mot de passe</h5>
        <form>
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="eye" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              type="password"
              placeholder="Nouveau mot de passe"
            />
          </MDBInputGroup>
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="eye" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              type="password"
              placeholder="Confirmé votre nouveau mot de passe"
            />
          </MDBInputGroup>

          <div className={styles.messageZone}>
            <p>Erreur</p>
          </div>

          <div className={styles.submitZone}>
            <MDBBtn color="info" type="submit">
              Enregistrer
            </MDBBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
