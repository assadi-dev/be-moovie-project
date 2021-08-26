import React from "react";
import styles from "./style.module.css";

const Comments = () => {
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
              <span className={styles.pseudoCommenter}>AZert93</span>{" "}
              <span className={styles.dateCommenter}>
                26 avril 2021 à 18:00
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              vitae dignissimos quo perferendis suscipit numquam nostrum
              eligendi beatae molestiae in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
