import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
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
            <div className={styles.sessionLinksDiv}>
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
                  {/* <ProfileButton user={sessionUser} /> */}
                  <button onClick={logout} className={styles.button}>log out</button>
                  <SpotAddModal isUsingUserLocation={true} fromNav={true} />
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
            {/* {sessionUser && (
            <div className={styles.welcomeDiv}>
              <div className={styles.username}>
                Welcome back, {sessionUser.username}.
              </div>
            </div>
          )} */}
          </div>
        </div>
      </div>
    )
  );
}

export default Navigation;
