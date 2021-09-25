import Flickity from "flickity";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import "./movieLists.css";
import axios from "axios";

export const MovieSimilar = ({ movieId }) => {
  const elem = useRef();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fltky = new Flickity(elem.current, {
      cellAlign: "left",
      freeScroll: true,
      contain: true,
      // disable previous & next buttons and dots
      prevNextButtons: true,
      pageDots: false,
    });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&page=1&region=FR`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div ref={elem} className={styles.movieLists}>
        {/*movies.map((movie, index) => (
          <Link key={index} to={`/movie/${movie.id}`}>
            <div className={styles.movieItem}>
              <img
                src={`https://www.themoviedb.org/t/p/w1280${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          </Link>
        ))*/}
      </div>
    </div>
  );
};
