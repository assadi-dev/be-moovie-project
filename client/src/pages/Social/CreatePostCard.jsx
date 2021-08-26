import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import MediaInputBtn from "../../components/mediaIconInput";

const CreatePostCard = () => {
  return (
    <div>
      <MDBCard>
        <form action="">
          <MDBCardBody>
            <div className={styles.post}>
              <div className={styles.rowPostInput}>
                <div className={styles.avatarCol}>
                  <img src="" alt="" srcset="" />
                </div>
                <div className={styles.inputCol}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quoi de neuf ?"
                      style={{ padding: "10px" }}
                    />
                  </div>
                  <div className={styles.media}>
                    <MediaInputBtn
                      name="image"
                      icon={<MDBIcon far icon="image" size="2x" />}
                      accept={".jpg,.jpeg,.png,.gif"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MDBCardBody>
          <MDBCardFooter>
            <div className={styles.rowBtn}>
              <MDBBtn color="danger">Annuler la publication</MDBBtn>
              <MDBBtn color="success">Publier</MDBBtn>
            </div>
          </MDBCardFooter>
        </form>
      </MDBCard>
    </div>
  );
};

export default CreatePostCard;
