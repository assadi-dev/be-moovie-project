import Flickity from "flickity";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { generate_slug } from "../../services/Movies.services";
import styles from "./style.module.css";

const movies = [
  { id: 1, title: "film1" },
  { id: 2, title: "film2" },
  { id: 3, title: "film3" },
  { id: 4, title: "film4" },
  { id: 5, title: "film5" },
  { id: 7, title: "film7" },
  { id: 8, title: "film8" },
  { id: 9, title: "film9" },
  { id: 10, title: "film10" },
  { id: 11, title: "film11" },
  { id: 12, title: "film12" },
];

export const MovieSimilar = () => {
  const elem = useRef();

  useEffect(() => {
    const fltky = new Flickity(elem.current, {
      cellAlign: "left",
      freeScroll: true,
      contain: true,
      // disable previous & next buttons and dots
      prevNextButtons: true,
      pageDots: false,
    });
  }, []);

  return (
    <div>
      <div ref={elem} className={styles.movieLists}>
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${generate_slug(movie.id, movie.title)}`}
          >
            <div className={styles.movieItem}>
              <img
                src="https://www.themoviedb.org/t/p/w1280/lG7Rv88OANLVbeR6Zymlid1cRuk.jpg"
                alt="poster-film"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
