import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import CardContact from "../../components/ContactCard";

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
          <div>
            <CardContact />
            <CardContact />
            <CardContact />
            <CardContact />
            <CardContact />
            <CardContact />
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Contact;
