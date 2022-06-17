import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SpotAddModal from "../SpotAddModal";
import DemoLoginButton from "../parts/DemoLoginButton";
import { getAllAreas } from "../../store/allAreas";
import * as sessionActions from "../../store/session";
import styles from "./Navigation.module.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllAreas());
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    isLoaded && (
      <div className={styles.navbarWrapper}>
        <div className={styles.navbar}>
          <div className={styles.navbarLeft}>
            <NavLink
              id={styles.navbarLogoLong}
              className={styles.navbarLogo}
              exact
              to="/"
            >
              <h1>zipcamp</h1>
            </NavLink>
            <NavLink
              id={styles.navbarLogoShort}
              className={styles.navbarLogo}
              exact
              to="/"
            >
              <h1>z</h1>
            </NavLink>
          </div>

          <div className={styles.navbarRight}>
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
                <SpotAddModal isUsingUserLocation={true} fromNav={true} />
                <p>Welcome back, {sessionUser.username}.</p>
              </>
            ) : (
              <>
                <LoginFormModal />
                <NavLink to="/signup" className={styles.navLink}>
                  sign up
                </NavLink>
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
