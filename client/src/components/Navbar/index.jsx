import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../utils/context/AuthContext";
import { logout } from "../../utils/context/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { clear_user, get_user } from "../../redux/actions/user.action";
import Notification from "./Notification";

const Navbar = () => {
  const userId = useAuthState().userId;
  const dispatchRed = useDispatch();
  const selector = useSelector((state) => state.UserReducers);
  const dispatch = useAuthDispatch();
  const location = useHistory();
  const [state, setState] = useState({
    navbarScroll: false,
  });

  const handleLogout = () => {
    dispatchRed(clear_user());
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

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setState({ ...state, smallScreen: true });
    } else {
      setState({ ...state, smallScreen: false });
    }
  };

  useEffect(() => {
    dispatchRed(get_user(userId));
    const mediaQuery = window.matchMedia("(max-width:1200px)");
    mediaQuery.addListener(handleMediaQueryChange);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userId, dispatchRed, dispatch, selector.pseudo]);

  return (
    <>
      {userId && (
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
                    <NavLink className={styles.navColLinkItem} to="/profil">
                      Mon Profil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={styles.navColLinkItem} to="/list/">
                      Mes Favoris
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className={styles.navColRight}>
                <Notification />

                <Link to="/profil">
                  <span className={styles.userPseudo}>
                    {selector.pseudo && selector.pseudo}
                  </span>
                  <img
                    className={styles.navAvatar}
                    src={selector.avatar}
                    alt="profile_image"
                  />
                </Link>
                <div className={styles.logoutContainer}>
                  <span
                    className="ripple-surface-danger"
                    onClick={handleLogout}
                  >
                    <MDBIcon fas icon="power-off" />
                  </span>
                </div>
              </div>
            </div>
          </MDBContainer>
        </MDBNavbar>
      )}
    </>
  );
};

export default Navbar;
