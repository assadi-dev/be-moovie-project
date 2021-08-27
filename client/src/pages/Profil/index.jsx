import React, { useState } from "react";
import styles from "./style.module.css";
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import EditProfile from "./EditProfile";
import { useSelector, useDispatch } from "react-redux";
import { getFullDate } from "../../services/times.services";

const Profil = () => {
  const [fillActive, setFillActive] = useState("tab1");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducers);

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  const { pseudo, birthday, email, presentation, followers, following } =
    userData;

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

              <h5 className={styles.pseudo}>{userData.pseudo}</h5>
              <p className={styles.userPresentation}>
                {userData.presentation && userData.presentation}
              </p>
              <span className={styles.sinceDate}>
                {`Membre depuis le ${getFullDate(userData.createdAt)}`}
              </span>
            </div>
            <div className={styles.statSection}>
              <div className={styles.followStats}>
                <div className={styles.followItem}>
                  <p>30</p>
                  <span>Publications</span>
                </div>
                <div className={styles.followItem}>
                  <p>{userData.following.length}</p>
                  <span>Siuvis</span>
                </div>
                <div className={styles.followItem}>
                  <p>{userData.followers.length}</p>
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
        <div className={styles.rightSide}>
          <div className={styles.rightSideWrapper}>
            <MDBTabs fill className="mb-3">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleFillClick("tab1")}
                  active={fillActive === "tab1"}
                >
                  Mes Favoris
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleFillClick("tab2")}
                  active={fillActive === "tab2"}
                >
                  Mon compte
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
              {fillActive === "tab1" && (
                <div className={styles.tabPaneWrapper}>
                  <div className={styles.showFavoris}>
                    <div className={styles.posterFavorisWrapper}>
                      <img
                        className={styles.posterFavoris}
                        src=""
                        alt="poster"
                        srcset=""
                      />

                      <MDBIcon
                        className={styles.favorisBtn}
                        fas
                        icon="times-circle"
                      />
                    </div>
                  </div>
                </div>
              )}
              {fillActive === "tab2" && (
                <div className={styles.tabPane}>
                  <EditProfile />
                </div>
              )}
            </MDBTabsContent>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profil;
