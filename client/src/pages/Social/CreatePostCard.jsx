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
        <form>
          <MDBCardBody>
            <div className={styles.post}>
              <div className={styles.rowPostInput}>
                <div className={styles.avatarCol}>
                  <img
                    src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1421x431:1423x429)/origin-imgresizer.eurosport.com/2020/12/22/2959891-60753748-2560-1440.jpg"
                    alt="user_avatar"
                  />
                </div>
                <div className={styles.inputCol}>
                  <div className={styles.postInputCreate}>
                    <textarea
                      placeholder="Quoi de neuf ?"
                      style={{ padding: "10px" }}
                      rows="1"
                    ></textarea>
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
              <MDBBtn color="info">Publier</MDBBtn>
            </div>
          </MDBCardFooter>
        </form>
      </MDBCard>
    </div>
  );
};

export default CreatePostCard;
