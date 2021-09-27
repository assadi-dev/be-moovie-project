import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
} from "mdb-react-ui-kit";
import EditProfile from "./EditProfile";
import { useSelector, useDispatch } from "react-redux";
import { getFullDate } from "../../services/times.services";
import { decode } from "ent";
import { edit_user_data, get_user } from "../../redux/actions/user.action";
import PosterFavoris from "./PosterFavoris";

const Profil = () => {
  const [fillActive, setFillActive] = useState("tab1");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducers);

  const [avatar, setAvatar] = useState("");
  const [preView, setPreView] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    setAvatar(userData.avatar);
  }, [userData]);

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    let file = URL.createObjectURL(e.target.files[0]);
    setAvatar(file);
    setPreView(true);
    setFile(e.target.files[0]);
  };

  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("author", userData.id);
    data.append("pseudo", decode(userData.pseudo));
    data.append("email", decode(userData.email));
    data.append("presentation", decode(userData.presentation));
    data.append("avatar", file);

    dispatch(edit_user_data(userData.id, data));
    setPreView(false);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainProfil}>
        <aside className={styles.leftSide}>
          <div className={styles.leftwrapper}>
            <div className={styles.avatarSection}>
              {userData.avatar && (
                <div className={styles.avatarContainer}>
                  <img src={avatar} alt="user_avatar" />
                  <form
                    onSubmit={handleSubmitAvatar}
                    className={styles.editAvatarBtn}
                  >
                    <label htmlFor="avatar" className={styles.editAvatarIcon}>
                      <MDBIcon fas icon="pencil-alt" /> Changer ma photo de
                      profil
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleChangeAvatar}
                        style={{ display: "none" }}
                      />
                    </label>

                    {preView && (
                      <MDBBtn color={"info"}>Valider la modification</MDBBtn>
                    )}
                  </form>
                </div>
              )}

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
                  href="#!"
                  onClick={() => handleFillClick("tab1")}
                  active={fillActive === "tab1"}
                >
                  Mes Favoris
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  href="#!"
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
                    {userData.movies.map((favorie) => (
                      <PosterFavoris id={favorie} />
                    ))}
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
