import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardHeader,
  MDBRow,
  MDBCardLink,
  MDBIcon,
  MDBBadge,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

const PostCard = () => {
  return (
    <div>
      <MDBCard>
        <MDBCardHeader className="border-bottom-0">
          <div className={styles.postHeader}>
            <div className={styles.avatarPost}>
              <img
                className={styles.avatarImg}
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.jpg"
                alt="avatar"
              />
            </div>
            <div className={styles.titlePost}>
              <h5>Card title</h5>
              <p className="text-muted">Publier le Jeudi 26 avril 2021</p>
            </div>
          </div>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <div className={styles.postMediaContent}>
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.jpg"
              alt="post_picture"
            />
          </div>
          <div className={styles.postCardBottom}>
            <div className={styles.actionPostbtn}>
              <a href="#!" className="text-dark">
                <MDBIcon far icon="thumbs-up" size="lg" />
                <MDBBadge color="danger" notification pill>
                  35
                </MDBBadge>
              </a>
            </div>
            <div className={styles.actionPostbtn}>
              <a href="#!" className="text-dark">
                <MDBIcon far icon="comment-alt" size="lg" />
              </a>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default PostCard;
