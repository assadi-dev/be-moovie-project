import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import PostTrendingCard from "../../components/TrendingCardPost";
import { useDispatch, useSelector } from "react-redux";
import { postMostLiked } from "../../services/Posts.services";

const TrendPost = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.PostReducers);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    let posts = postMostLiked(allPosts.collections);
    setPosts(posts);
  }, [loading]);

  return (
    <>
      <MDBCard className={styles.following}>
        <MDBCardBody>
          <MDBCardTitle>Les + aimes</MDBCardTitle>
          <div className={styles.trendContainer}>
            {!loading &&
              posts.map((post, index) => (
                <PostTrendingCard key={index} data={post} />
              ))}
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default TrendPost;
