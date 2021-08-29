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
import {
  add_comment,
  like_post,
  unlike_post,
} from "../../redux/actions/post.action";
import classNames from "classnames";
import { isLiked } from "../../services/Posts.services";

const PostCard = ({ data, user }) => {
  const dispatch = useDispatch();
  const comments = data.comments;

  const [commentValue, setCommentValue] = useState({
    author: "",
    pseudo: "",
    postId: "",
    text: "",
  });

  const [toggLeBtn, setToogleBtn] = useState({ like: false, comment: false });

  useEffect(() => {
    setCommentValue({
      ...commentValue,
      postId: data._id,
      author: user.id,
      pseudo: user.pseudo,
    });
  }, [commentValue.text, dispatch, toggLeBtn.like]);

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

  const handleLikebtn = () => {
    if (isLiked(user.postLikes, data._id)) {
      dispatch(unlike_post(data._id));
    } else {
      dispatch(like_post(data._id));
    }
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
            <a
              className={classNames(styles.actionBtn, styles.likesBtn)}
              href="#!"
              onClick={handleLikebtn}
            >
              {isLiked(user.postLikes, data._id) ? (
                <MDBIcon fas icon="heart" />
              ) : (
                <MDBIcon far icon="heart" />
              )}

              <MDBBadge color="danger" notification pill>
                {data.likers.length > 0 && data.likers.length}
              </MDBBadge>
            </a>
          </div>
          <div className={styles.actionPostbtn}>
            <a href className={classNames(styles.actionBtn, styles.likesBtn)}>
              <MDBIcon far icon="comment-alt" />{" "}
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
