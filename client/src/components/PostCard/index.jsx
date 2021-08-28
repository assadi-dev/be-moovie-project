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
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { getFullDateWeek, getTimeMin } from "../../services/times.services";

const PostCard = ({ data }) => {
  const dispatch = useDispatch();
  const comments = data.comments;

  return (
    <MDBCard className="w-100 my-2">
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
            <h5>{data.author}</h5>
            <p className="text-muted">
              {`${getFullDateWeek(data.createdAt)} à ${getTimeMin(
                data.createdAt
              )}`}
            </p>
          </div>
        </div>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardText>{data.message}</MDBCardText>
        <div className={styles.postMediaContent}>
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.jpg"
            alt="post_picture"
          />
        </div>
        <div className={styles.postCardBottom}>
          <div className={styles.actionPostbtn}>
            <a href="#!">
              <MDBIcon far icon="thumbs-up" size="lg" />
              <MDBBadge color="danger" notification pill>
                35
              </MDBBadge>
            </a>
          </div>
          <div className={styles.actionPostbtn}>
            <a href="#!">
              <MDBIcon far icon="comment-alt" size="lg" />
            </a>
          </div>
        </div>
        <div className={styles.sendCommentZone}>
          <form>
            <div className={styles.commentSend}>
              <textarea
                id="text"
                name="text"
                placeholder="Laisser un commentaire"
                rows="1"
              ></textarea>
              <button className={styles.commentBtn}>
                <MDBIcon far icon="paper-plane" size="lg" />
              </button>
            </div>
          </form>
        </div>
        {comments.map((comment) => (
          <Comments key={comment.id} data={comment} />
        ))}
      </MDBCardBody>
    </MDBCard>
  );
};

export default PostCard;
