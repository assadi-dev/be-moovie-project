import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { getFullDateWeek, getTimeMin } from "../../services/times.services";
import { decode } from "ent";
import { add_comment } from "../../redux/actions/post.action";

const PostCard = ({ data, user }) => {
  const dispatch = useDispatch();
  const comments = data.comments;

  const [commentValue, setCommentValue] = useState({
    author: "",
    pseudo: "",
    postId: "",
    text: "",
  });

  useEffect(() => {
    setCommentValue({
      ...commentValue,
      postId: data._id,
      author: user.id,
      pseudo: user.pseudo,
    });
  }, [commentValue.text, dispatch]);

  const handleChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCommentValue({ ...commentValue, [name]: value });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    let commentData = {
      author: commentValue.author,
      pseudo: commentValue.pseudo,
      text: commentValue.text,
    };
    dispatch(add_comment(data._id, commentData));
    setCommentValue({ ...commentValue, postId: "", text: "" });
  };

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
            <h5>{decode(data.pseudo)}</h5>
            <p className="text-muted">
              {`${getFullDateWeek(data.createdAt)} à ${getTimeMin(
                data.createdAt
              )}`}
            </p>
          </div>
        </div>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardText>{decode(data.message)}</MDBCardText>
        {data.media.picture.length > 0 && (
          <div className={styles.postMediaContent}>
            <MDBCardImage src={data.media.picture} alt="post_picture" />
          </div>
        )}
        <div className={styles.postCardBottom}>
          <div className={styles.actionPostbtn}>
            <a href="#!">
              <MDBIcon far icon="thumbs-up" size="lg" />
              <MDBBadge color="danger" notification pill>
                {data.likers.length > 0 && data.likers.length}
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
          <form onSubmit={handleSubmitComment}>
            <div className={styles.commentSend}>
              <textarea
                id="text"
                name="text"
                placeholder="Laisser un commentaire"
                rows="1"
                onChange={handleChangeValue}
                value={commentValue.text}
              ></textarea>
              <button className={styles.commentBtn}>
                <MDBIcon far icon="paper-plane" size="lg" />
              </button>
            </div>
          </form>
        </div>
        {comments
          .sort((a, b) => {
            return b.createdAt > a.createdAt;
          })
          .map((comment, index) => (
            <Comments key={index} data={comment} />
          ))}
      </MDBCardBody>
    </MDBCard>
  );
};

export default PostCard;
