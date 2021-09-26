import React, { useState, useEffect } from "react";
import { MDBIcon, MDBBadge } from "mdb-react-ui-kit";
import classNames from "classnames";
import styles from "./style.module.css";
import { like_post, unlike_post } from "../../redux/actions/post.action";
import { useDispatch } from "react-redux";

const LikeBtn = ({ postId, likers, userId }) => {
  const [toggleBtn, setToggleBtn] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (likers.includes(userId)) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [userId, likers]);
  const handleLike = () => {
    dispatch(like_post(postId));
    setToggleBtn(true);
  };

  const handleUnleLike = () => {
    dispatch(unlike_post(postId));
    setToggleBtn(false);
  };

  return (
    <>
      <span className={classNames(styles.actionBtn, styles.likesBtn)}>
        {toggleBtn ? (
          <MDBIcon fas icon="heart" onClick={handleUnleLike} />
        ) : (
          <MDBIcon far icon="heart" onClick={handleLike} />
        )}

        <MDBBadge color="danger" notification pill>
          {likers.length > 0 && likers.length}
        </MDBBadge>
      </span>
    </>
  );
};

export default LikeBtn;
