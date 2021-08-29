import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import PostTrendingCard from "../../components/TrendingCardPost";

const TrendPost = () => {
  return (
    <>
      <MDBCard className={styles.following}>
        <MDBCardBody>
          <MDBCardTitle>Les + aimes</MDBCardTitle>
          <div className={styles.trendContainer}>
            <PostTrendingCard />
            <PostTrendingCard />
            <PostTrendingCard />
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default TrendPost;
