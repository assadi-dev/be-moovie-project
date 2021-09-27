import React, { useEffect, useRef, useState } from "react";
import Flickity from "flickity";
import "./styleCarousel.css";
import { Link } from "react-router-dom";

const CarousselGroup = ({ movies }) => {
  const urlImg = `https://image.tmdb.org/t/p/w220_and_h330_face`;

  const refCarousel = useRef();

  useEffect(() => {
    const flkty = new Flickity(refCarousel.current, {
      cellAlign: "left",
      contain: true,
      freeScroll: true,
      pageDots: false,
      selectedAttraction: 0.01,
      friction: 0.15,
    });

    return () => {
      flkty.destroy();
    };
  }, [movies]);

  return (
    <div ref={refCarousel} className="main-carousel">
      {movies.map((item, index) => (
        <Link key={index} to={`/movie/${item.id}`}>
          <div className="carousel-cell">
            <img
              src={`${urlImg}/${item.poster_path}`}
              alt={item.title}
              className="coverContainer"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarousselGroup;
