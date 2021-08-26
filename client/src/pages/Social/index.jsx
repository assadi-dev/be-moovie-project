import React from "react";
import styles from "./style.module.css";

const Social = () => {
  return (
    <main className={styles.socialContainer}>
      <div className={styles.leftSocialCol}>
        <div className={styles.following}>test</div>
      </div>
      <div className={styles.mainSocialCol}></div>
      <div className={styles.rightSocialCol}></div>
    </main>
  );
};

export default Social;
