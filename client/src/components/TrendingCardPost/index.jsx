import React from "react";
import styles from "./style.module.css";

const PostTrendingCard = () => {
  return (
    <div className={styles.trendingCardContainer}>
      <div className={styles.leftCol}>
        <img
          src="https://www.parolesdefoot.com/wp-content/uploads/2011/02/fifa_ronaldo.jpg"
          alt="post_user_avatar"
        />
      </div>
      <div className={styles.rightCol}>
        <p className={styles.postMessage}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          mollitia quo, pariatur velit eum aspernatur dicta perferendis
          provident cupiditate eligendi ratione exercitationem id natus autem
          ullam voluptates illum doloremque harum?
        </p>
      </div>
    </div>
  );
};

export default PostTrendingCard;
