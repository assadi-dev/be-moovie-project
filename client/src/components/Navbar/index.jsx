import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../utils/context/AuthContext";
import { logout } from "../../utils/context/AuthAction";

const Navbar = () => {
  const userData = useAuthState();
  const dispatch = useAuthDispatch();
  const location = useHistory();
  const [state, setState] = useState({
    navbarScroll: false,
    dropdownMenu: false,
    toogleMenu: false,
  });

  const handleLogout = () => {
    logout(dispatch);
    location.push("/login");
  };

  //NavBar scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setState({
        ...state,
        navbarScroll: true,
      });
    } else {
      setState({
        ...state,
        navbarScroll: false,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <MDBNavbar
        className={styles.navBg}
        fixed="top"
        light
        bgColor={state.navbarScroll ? "dark" : "transparent"}
      >
        <MDBContainer fluid>
          <div className={styles.navRow}>
            <div className={styles.navColCenter}>
              <div className={styles.navColLeft}>
                <Link to="/">
                  <MDBNavbarBrand className="mb-0 h1">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
                      height="30"
                      alt=""
                      loading="lazy"
                    />
                  </MDBNavbarBrand>
                </Link>
              </div>
              <ul className={styles.navColLink}>
                <li>
                  {" "}
                  <NavLink
                    activeClassName="active"
                    className={styles.navColLinkItem}
                    to="/social"
                  >
                    Social
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink
                    exact
                    activeClassName="active"
                    className={styles.navColLinkItem}
                    to="/"
                  >
                    Films
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    className={styles.navColLinkItem}
                    to="/profil"
                  >
                    Mon Profil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    className={styles.navColLinkItem}
                    to="/list/"
                  >
                    Mes Favoris
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={styles.navColRight}>
              <Link>
                <span>mate@21</span>
                <img
                  className={styles.navAvatar}
                  src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1421x431:1423x429)/origin-imgresizer.eurosport.com/2020/12/22/2959891-60753748-2560-1440.jpg"
                  alt="profile_image"
                />
              </Link>
              <div className={styles.logoutContainer}>
                <span className="ripple-surface-danger" onClick={handleLogout}>
                  <MDBIcon fas icon="power-off" />
                </span>
              </div>
            </div>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
