import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../utils/context/AuthContext";
import styles from "./style.module.css";

const TabBar = () => {
  const userId = useAuthState().userId;

  return (
    <>
      {userId && (
        <div className={styles.TabBarContainer}>
          <ul className={styles.menuContainer}>
            <li className={styles.menuItem}>
              <NavLink to="/social" className={styles.navlink}>
                <MDBIcon far icon="comment-alt" />
                <span className={styles.titleMenu}>social</span>
              </NavLink>{" "}
            </li>
            <li className={styles.menuItem}>
              <NavLink
                exact
                to="/"
                className={styles.navlink}
                activeClassName="active"
              >
                <MDBIcon fas icon="film" />
                <span className={styles.titleMenu}>Accueil</span>
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/notification" className={styles.navlink}>
                <MDBIcon far icon="bell" />
                <span className={styles.titleMenu}> notification</span>
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/profil" className={styles.navlink}>
                <MDBIcon far icon="user" />
                <span className={styles.titleMenu}> profile </span>
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <span to="#" className={styles.navlink}>
                <MDBIcon fas icon="bars" />
                <span className={styles.titleMenu}> menu</span>
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TabBar;
