import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard";
import { get_all_post } from "../../redux/actions/post.action";
import Contact from "./Contact";
import CreatePostCard from "./CreatePostCard";
import MovieNow from "./MovieNow";
import styles from "./style.module.css";
import TrendPost from "./TrendPost";

const Social = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.AllPostReducers.collections);

  useEffect(() => {
    dispatch(get_all_post());
  }, []);

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
            {posts.map((post) => (
              <PostCard key={post.id} data={post} />
            ))}
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
