import React from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import HeaderMedia from "../../components/HeaderMedia";

const Movie = ({ state }) => {
  const { id } = useParams();

  return (
    <>
      <HeaderMedia />
    </>
  );
};

export default Movie;
