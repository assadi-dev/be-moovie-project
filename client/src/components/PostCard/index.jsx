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
import { useDispatch, useSelector } from "react-redux";
import { getFullDateWeek, getTimeMin } from "../../services/times.services";
import { decode } from "ent";
import {
  add_comment,
  get_all_post,
  like_post,
  unlike_post,
} from "../../redux/actions/post.action";
import classNames from "classnames";
import { isLiked } from "../../services/Posts.services";

const PostCard = ({ data, user }) => {
  const dispatch = useDispatch();
  const loadingPost = useSelector((state) => state.PostReducers.isLoading);
  const posts = useSelector((state) => state.PostReducers.collections);
  const comments = data.comments;

  const [commentValue, setCommentValue] = useState({
    postId: data._id,
    author: user.id,
    pseudo: user.pseudo,
    text: "",
  });

  const [toggLeBtn, setToogleBtn] = useState({ like: false, comment: false });
  const [totalikers, setTotalikers] = useState(0);
  const getTotaLikes = () => {
    const datalike = posts.filter((post) => post._id === data._id)[0].likers;
    setTotalikers(datalike);
  };

  useEffect(() => {
    dispatch(get_all_post());
    getTotaLikes();

    setCommentValue({
      ...commentValue,
      postId: data._id,
      author: user.id,
      pseudo: user.pseudo,
    });
  }, [dispatch, toggLeBtn.like]);

  const handleChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCommentValue({ ...commentValue, [name]: value });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    let data = new FormData();

    data.set("author", commentValue.author);
    data.set("pseudo", commentValue.pseudo);
    data.set("text", commentValue.text);

    dispatch(add_comment(data._id, data));
    setCommentValue({ ...commentValue, postId: "", text: "" });
  };

  const handleLikebtn = () => {
    if (isLiked(user.postLikes, data._id)) {
      dispatch(unlike_post(data._id));
      let remove = totalikers.filter((likers) => !likers.includes(user.id));
      setTotalikers(remove);
    } else {
      dispatch(like_post(data._id));
      let add = [...totalikers, user.id];
      setTotalikers(add);
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
        {
          <div className={styles.postMediaContent}>
            {data.media
              ? data.media.map(
                  (media, index) =>
                    media.path !== "" && (
                      <MDBCardImage
                        key={index}
                        src={media.path}
                        alt={`${data.pseudo}_post_image`}
                      />
                    )
                )
              : ""}
          </div>
        }
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
                {totalikers.length > 0 && totalikers.length}
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
