import React, { useEffect } from "react";
import Flickity from "flickity";
import styles from "./style.module.css";

const movies = [
  { id: 1, title: "film1" },
  { id: 2, title: "film2" },
  { id: 3, title: "film3" },
  { id: 4, title: "film4" },
  { id: 5, title: "film5" },
  { id: 6, title: "film6" },
];

const CarousselGroup = () => {
  useEffect(() => {
    const initCarousel = () => {
      const elem = document.querySelector(".main-carousel");
      const flkty = new Flickity(elem, {
        cellAlign: "left",
        contain: true,
      });
    };

    initCarousel();
  }, []);

  return (
    <div className="main-carousel">
      {movies.map((movie) => (
        <div className="carousel-cell"></div>
      ))}
    </div>
  );
};

export default CarousselGroup;
