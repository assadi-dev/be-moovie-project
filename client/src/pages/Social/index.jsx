import React from "react";
import PostCard from "../../components/PostCard";
import Contact from "./Contact";
import CreatePostCard from "./CreatePostCard";
import MovieNow from "./MovieNow";
import styles from "./style.module.css";
import TrendPost from "./TrendPost";

const Social = () => {
  return (
    <main className={styles.socialContainer}>
      {/**Left Colonne */}
      <div className={styles.leftSocialCol}>
        <div className={styles.blocAffiche}>
          <MovieNow />
        </div>
        <div className={styles.bloc}>
          <ul>
            <li>Actualites</li>
            <li>Mes publications</li>
            <li>Poste des personnes suivi</li>
          </ul>
        </div>
      </div>
      {/**Middle Colonne */}
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
        <TrendPost />

        <Contact />
      </div>
    </main>
  );
};

export default Social;
