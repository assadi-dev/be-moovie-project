import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";

const Contact = () => {
  return (
    <>
      <MDBCard className={styles.suggestion}>
        <MDBCardBody>
          <MDBCardTitle>Vous n'etes pas seuls</MDBCardTitle>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher une personne"
            />
          </div>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBBtn>Button</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Contact;
