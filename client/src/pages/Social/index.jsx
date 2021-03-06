import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import PostCard from "../../components/PostCard";
import { get_all_post } from "../../redux/actions/post.action";
import {
  get_all_users,
  get_notification,
} from "../../redux/actions/user.action";
import Contact from "./Contact";
import CreatePostCard from "./CreatePostCard";
import MovieNow from "./MovieNow";
import styles from "./style.module.css";
import TrendPost from "./TrendPost";

const Social = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.PostReducers.collections);
  const loading = useSelector((state) => state.PostReducers.isLoading);
  const user = useSelector((state) => state.UserReducers);
  const socket = io.connect(`http://${window.location.hostname}:6500`);

  useEffect(() => {
    socket.emit("join_room", user.id);
    socket.on("news", (res) => {
      if (res.author !== user.id) {
        dispatch(get_notification(user.id));
      }
    });

    dispatch(get_all_post());
    dispatch(get_all_users());
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
          <CreatePostCard userData={user} />
          <div className={styles.postList}>
            {user &&
              posts.map((post, index) => (
                <PostCard key={index} user={user} data={post} />
              ))}
          </div>
        </div>
      </div>
      {/**Right Colonne */}
      <div className={styles.rightSocialCol}>
        <TrendPost />

        {user && <Contact />}
      </div>
    </main>
  );
};

export default Social;
