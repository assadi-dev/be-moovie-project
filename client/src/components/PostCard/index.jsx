import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardHeader,
  MDBIcon,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import { getFullDateWeek, getTimeMin } from "../../services/times.services";
import { decode } from "ent";
import classNames from "classnames";
import LikeBtn from "./LikeBtn";
import CommentsLists from "./CommentsLists";
import { useSelector } from "react-redux";

const PostCard = ({ data, user }) => {
  const allUser = useSelector((state) => state.AllUsersReducers.collections);

  const [avatar, setAvatar] = useState();

  const getAvatar = (id) => {
    let user = allUser.filter((user) => user._id === id);
    return user[0].avatar;
  };

  useEffect(() => {
    let imgAvatar = getAvatar(data.author);
    setAvatar(imgAvatar);
  }, [data, user, allUser]);

  return (
    <MDBCard className="w-100 my-2">
      <MDBCardHeader className="border-bottom-0">
        <div className={styles.postHeader}>
          <div className={styles.avatarPost}>
            <img className={styles.avatarImg} src={avatar} alt="avatar" />
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
            <LikeBtn postId={data._id} likers={data.likers} userId={user.id} />
          </div>
          <div className={styles.actionPostbtn}>
            <a href className={classNames(styles.actionBtn, styles.likesBtn)}>
              <MDBIcon far icon="comment-alt" />{" "}
            </a>
          </div>
        </div>
        <div className={styles.sendCommentZone}>
          <CommentsLists post={data} user={user} />
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default PostCard;
