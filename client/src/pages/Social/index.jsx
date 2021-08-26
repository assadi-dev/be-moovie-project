import React from "react";
import PostCard from "../../components/PostCard";
import CreatePostCard from "./CreatePostCard";
import styles from "./style.module.css";

const Social = () => {
  return (
    <main className={styles.socialContainer}>
      {/**Left Colonne */}
      <div className={styles.leftSocialCol}>
        <div className={styles.blocAffiche}>
          <h5>film à l'affiche</h5>
        </div>
        <div className={styles.bloc}>
          <ul>
            <li>Actualites</li>
            <li>Mes publications</li>
            <li>Poste des personnes suivi</li>
          </ul>
        </div>
      </div>
      {/**liddle Colonne */}
      <div className={styles.mainSocialCol}>
        <div className={styles.PostContainer}>
          <CreatePostCard />
          <div className={styles.postList}>
            <PostCard />
          </div>
        </div>
      </div>
      {/**Right Colonne */}
      <div className={styles.rightSocialCol}>
        <div className={styles.following}>
          <h5>Publications suivis</h5>
        </div>
        <div className={styles.following}>
          <h5>Suggestions</h5>
          <input type="text" placeholder="contact" />
        </div>
      </div>
    </main>
  );
};

export default Social;
