import { decode } from "ent";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const PostTrendingCard = ({ data }) => {
  useEffect(() => {}, [data]);

  return (
    <div className={styles.trendingCardContainer}>
      <div className={styles.leftCol}>
        <img
          src="https://www.parolesdefoot.com/wp-content/uploads/2011/02/fifa_ronaldo.jpg"
          alt="post_user_avatar"
        />
      </div>
      <div className={styles.rightCol}>
        <p className={styles.postMessage}>{decode(data.message)}</p>
      </div>
    </div>
  );
};

export default PostTrendingCard;
