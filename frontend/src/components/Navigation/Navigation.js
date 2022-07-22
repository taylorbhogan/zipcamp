import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SpotAddModal from "../SpotAddModal";
import DemoLoginButton from "../parts/DemoLoginButton";
import { getAllAreas } from "../../store/allAreas";
import * as sessionActions from "../../store/session";
import styles from "./Navigation.module.css";
import { Modal } from "../../context/Modal";

function Navigation({ isLoaded }) {
  const [showModal, setShowModal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllAreas());
  }, [dispatch]);

  const handleScroll = () => {
    const hideHeight = 700;
    const windowScrollHeight =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (windowScrollHeight > hideHeight) {
      showWelcome && setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const navLinks = (
    <>
      <NavLink
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
        exact
        to="/areas"
      >
        public lands
      </NavLink>
      <NavLink
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
        exact
        to="/spots"
      >
        community spots
      </NavLink>
      {sessionUser ? (
        <>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
            exact
            to="/my-spots"
          >
            my spots
          </NavLink>
          <button onClick={logout} className={styles.button}>
            log out
          </button>
        </>
      ) : (
        <>
          <LoginFormModal />
          <NavLink to="/signup" className={styles.navLink}>
            sign up
          </NavLink>
        </>
      )}
    </>
  );
  return (
    isLoaded && (
      <div className={styles.navbarWrapper}>
        <div className={styles.navbar}>
          <div className={styles.navbarLeft}>
            <button
              className={`material-icons md-dark ${styles.menuButton}`}
              onClick={() => setShowModal((showModal) => !showModal)}
            >
              menu
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <div className={styles.smallScreenNavLinks}>{navLinks}</div>
              </Modal>
            )}
            <NavLink className={styles.logo} exact to="/">
              <h1>zipcamp</h1>
            </NavLink>
          </div>
          <div className={styles.navbarRight}>
            <div className={styles.navLinks}>{navLinks}</div>
            {sessionUser ? (
              <>
                <SpotAddModal isUsingUserLocation={true} />
                {location.pathname === "/" && showWelcome && (
                  <p>welcome back, {sessionUser.username}.</p>
                )}
              </>
            ) : (
              <>
                <DemoLoginButton buttonText={"demo login"} />
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Navigation;
