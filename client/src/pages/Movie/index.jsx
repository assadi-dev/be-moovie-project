import React from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import HeaderMedia from "../../components/HeaderMedia";
import SeparatorTitleStyle from "../../components/separatortitleStyle";
import TabsMedia from "../../components/TabsMedias";

const Movie = ({ state }) => {
  const { id } = useParams();

  return (
    <>
      <HeaderMedia />
      <main>
        <section className={styles.sectionContent}>
          <div className={styles.leftCol}>
            {" "}
            <div className={styles.pictureContent}>
              <img
                src="https://www.themoviedb.org/t/p/w1280/lG7Rv88OANLVbeR6Zymlid1cRuk.jpg"
                alt="poster"
              />
            </div>
          </div>
          <div className={styles.mainCol}>
            <SeparatorTitleStyle title="Synopsis" />
            <div className={styles.previewContainer}>
              <p>
                Un employé de banque, découvrant un jour qu’il n’est en fait
                qu’un personnage d’arrière-plan dans un jeu vidéo en ligne,
                décide de devenir le héros de sa propre histoire, quitte à la
                réécrire. Evoluant désormais dans un monde qui ne connaît pas de
                limites, il va tout mettre en œuvre pour le sauver à sa manière,
                avant qu’il ne soit trop tard…
              </p>
            </div>
            <SeparatorTitleStyle title="Pour vous" />
            <div className={styles.previewContainer}>
              <TabsMedia />
            </div>
          </div>
          <div className={styles.rightCol}></div>
        </section>
      </main>
    </>
  );
};

export default Movie;
