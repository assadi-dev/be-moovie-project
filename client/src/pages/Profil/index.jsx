import React from "react";
import styles from "./style.module.css";
import { MDBIcon } from "mdb-react-ui-kit";

const Profil = () => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainProfil}>
        <aside className={styles.leftSide}>
          <div className={styles.leftwrapper}>
            <div className={styles.avatarSection}>
              <img
                src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1421x431:1423x429)/origin-imgresizer.eurosport.com/2020/12/22/2959891-60753748-2560-1440.jpg"
                alt="user_avatar"
                srcset=""
              />

              <h5 className={styles.pseudo}>mate@21</h5>
              <span className={styles.sinceDate}>
                Membre de puis le 22 avril 2021
              </span>
            </div>
            <div className={styles.statSection}>
              <div className={styles.followStats}>
                <div className={styles.followItem}>
                  <p>30</p>
                  <span>Publications</span>
                </div>
                <div className={styles.followItem}>
                  <p>30</p>
                  <span>Siuvis</span>
                </div>
                <div className={styles.followItem}>
                  <p>30</p>
                  <span>Vous suivent</span>
                </div>
              </div>
            </div>
            <div className={styles.leftSectionBottom}>
              <span>
                <MDBIcon fas icon="power-off" /> Déconnexion
              </span>
            </div>
          </div>
        </aside>
        <div className={styles.rightSide}></div>
      </div>
    </main>
  );
};

export default Profil;
