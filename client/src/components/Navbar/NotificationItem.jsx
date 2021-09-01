import React from "react";
import styles from "./style.module.css";

const NotificationItem = ({ avatar, author, message }) => {
  return (
    <>
      <li className={styles.listItems}>
        {<img className={styles.avatar} src={avatar} alt="author_picture" />}
        <div className={styles.blocMessage}>
          <span className={styles.message}>
            <span className={styles.author}>{author}</span>
            {message}
          </span>
        </div>
      </li>
    </>
  );
};

export default NotificationItem;
