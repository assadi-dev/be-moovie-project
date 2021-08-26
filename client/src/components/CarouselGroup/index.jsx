import React, { useEffect } from "react";
import Flickity from "flickity";
import "./styleCarousel.css";
import { Link } from "react-router-dom";
import { generate_slug } from "../../services/Movies.services";

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

const CarousselGroup = () => {
  useEffect(() => {
    const initCarousel = () => {
      document.querySelectorAll(".main-carousel").forEach((carousel) => {
        const flkty = new Flickity(carousel, {
          cellAlign: "left",
          contain: true,
          freeScroll: true,
          pageDots: false,
          selectedAttraction: 0.01,
          friction: 0.15,
        });
      });
    };

    initCarousel();
  }, []);

  return (
    <div className="main-carousel">
      {movies.map((movie, index) => (
        <Link key={index} to={`/movie/${generate_slug(movie.id, movie.title)}`}>
          <div className="carousel-cell">
            <div className="coverContainer"></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarousselGroup;
