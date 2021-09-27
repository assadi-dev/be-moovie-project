import decode from "ent/decode";
import React, { useEffect, useState } from "react";
import { follow_user, unfollow_user } from "../../redux/actions/user.action";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { isFollow } from "../../services/Posts.services";

const CardContact = ({ data }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducers);
  const [followBtn, setFollowBtn] = useState(false);

  useEffect(() => {
    if (isFollow(userData.following, data._id)) {
      setFollowBtn(true);
    } else {
      setFollowBtn(false);
    }
  }, [data]);

  const handleFollow = () => {
    setFollowBtn(true);
    dispatch(follow_user(data._id));
  };

  const handleUnFollow = () => {
    setFollowBtn(false);
    dispatch(unfollow_user(data._id));
  };

  return (
    <div className={styles.contactCardContainer}>
      <div className={styles.left}>
        <img
          src="https://www.footpack.fr/wp-content/uploads/2018/04/Nike-Mercurial-R9-Mbappe%CC%81-Dembe%CC%81le%CC%81-6-335x601.jpg"
          alt="contact_avatar"
        />
        <p className={styles.pseudo}>{decode(data.pseudo)}</p>
      </div>
      <div className={styles.bottom}>
        {followBtn ? (
          <span className={styles.followBtn} onClick={handleUnFollow}>
            Abonné
          </span>
        ) : (
          <span className={styles.unfollowBtn} onClick={handleFollow}>
            Suivre
          </span>
        )}
      </div>
    </div>
  );
};

export default CardContact;
