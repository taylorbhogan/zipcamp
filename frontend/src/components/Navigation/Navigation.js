import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SpotAddModal from "../SpotAddModal";
import DemoLoginButton from "../parts/DemoLoginButton";
import { getAllAreas } from "../../store/allAreas";
import styles from "./Navigation.module.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllAreas());
  }, [dispatch]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className={styles.welcomeDiv}>
        <div className={styles.username}>
          Welcome back, {sessionUser.username}.
        </div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className={styles.sessionLinksDiv}>
        <LoginFormModal />
        <DemoLoginButton buttonText={"try it out"} />
        <NavLink to="/signup" className={styles.signUpLink}>
          sign up
        </NavLink>
      </div>
    );
  }

  return (
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
          <div className={styles.navLinkList}>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              exact
              to="/areas"
            >
              <h2>public lands</h2>
            </NavLink>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              exact
              to="/spots"
            >
              <h2>community spots</h2>
            </NavLink>
            {sessionUser && (
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact
                to="/my-spots"
              >
                <h2>my spots</h2>
              </NavLink>
            )}
            <SpotAddModal isUsingUserLocation={true} selectedArea={{
              id: 99,
              latitude: "40.674874",
              longitude: "-122.440264",
            }}/>
          </div>
        </div>
        <div className={styles.navbarRight}>{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
