import React, { useEffect, useState } from "react";
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
import { decode } from "ent";
import { get_user } from "../../redux/actions/user.action";

const Profil = () => {
  const [fillActive, setFillActive] = useState("tab1");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducers);

  useEffect(() => {}, [userData.isLoading, dispatch]);

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainProfil}>
        <aside className={styles.leftSide}>
          <div className={styles.leftwrapper}>
            <div className={styles.avatarSection}>
              <img
                src="uploads/61222b3678db65415007b7ea/1630342811028_6tcaxeexz.png"
                alt="user_avatar"
              />

              <h5 className={styles.pseudo}>
                {userData.pseudo && decode(userData.pseudo)}
              </h5>
              {userData.presentation && (
                <p className={styles.userPresentation}>
                  {decode(userData.presentation)}
                </p>
              )}

              <p className={styles.birthDate}>
                {`${getFullDate(userData.birthday)}`}
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
                  <span>Suivis</span>
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
                  <EditProfile data={userData} />
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
