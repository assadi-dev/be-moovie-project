import React from "react";
import styles from "./style.module.css";

const PreviewPost = ({ file }) => {
  return (
    <div className={styles.preViwContainer}>
      <img src={file} alt="preview_Image" />
    </div>
  );
};

export default PreviewPost;
