import React from "react";
import styles from "./style.module.css";
import { getFullDate, getTimeMin } from "../../services/times.services";

const Comments = ({ data }) => {
  return (
    <>
      <div className={styles.showCommentZone}>
        <div className={styles.commentContainer}>
          <div className={styles.avatarComment}>
            <img
              src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1421x431:1423x429)/origin-imgresizer.eurosport.com/2020/12/22/2959891-60753748-2560-1440.jpg"
              alt="author_comment"
            />
          </div>
          <div className={styles.commentText}>
            <div className={styles.commentTitle}>
              <span className={styles.pseudoCommenter}>{data.pseudo}</span>
              <span className={styles.dateCommenter}>
                {`${getFullDate(data.createdAt)} à ${getTimeMin(
                  data.createdAt
                )}`}
              </span>
            </div>
            <p>{data.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
