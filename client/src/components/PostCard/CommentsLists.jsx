import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { add_comment, get_all_post } from "../../redux/actions/post.action";
import Comments from "./Comments";
import { MDBIcon } from "mdb-react-ui-kit";
import { io } from "socket.io-client";

const CommentsLists = ({ post, user }) => {
  const [showComments, setShowComment] = useState(false);
  const dispatch = useDispatch();
  const loadingPost = useSelector((state) => state.PostReducers.isLoading);
  const posts = useSelector((state) => state.PostReducers.collections);
  const [comments, setComments] = useState([]);

  const [commentValue, setCommentValue] = useState({
    postId: post._id,
    author: user.id,
    pseudo: user.pseudo,
    text: "",
  });

  useEffect(() => {
    setCommentValue({
      ...commentValue,
      postId: post._id,
      author: user.id,
      pseudo: user.pseudo,
    });
  }, [posts]);

  const handleChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCommentValue({ ...commentValue, [name]: value });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentValue.text === "") {
      return false;
    }
    let data = {
      author: commentValue.author,
      pseudo: commentValue.pseudo,
      text: commentValue.text,
    };
    setCommentValue({ ...commentValue, postId: "", text: "" });
    dispatch(add_comment(commentValue.postId, data));
  };

  return (
    <>
      <form onSubmit={handleSubmitComment}>
        <div className={styles.commentSend}>
          <textarea
            id="text"
            name="text"
            placeholder="Laisser un commentaire"
            rows="1"
            onChange={handleChangeValue}
            value={commentValue.text}
            required
          ></textarea>
          <button className={styles.commentBtn}>
            <MDBIcon far icon="paper-plane" size="lg" />
          </button>
        </div>
      </form>
      {posts
        .filter((postItem) => postItem._id === post._id)[0]
        .comments.sort((a, b) => {
          return b.createdAt > a.createdAt;
        })
        .map((comment, index) => (
          <Comments key={index} data={comment} />
        ))}
    </>
  );
};

export default CommentsLists;
