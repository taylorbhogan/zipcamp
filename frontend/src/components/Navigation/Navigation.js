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
          join
        </NavLink>
      </div>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <NavLink id={styles.navbarLogoLong} className={styles.navbarLogo} exact to="/">
            zipcamp
          </NavLink>
          <NavLink id={styles.navbarLogoShort}className={styles.navbarLogo} exact to="/">
            z
          </NavLink>
          <div className={styles.navLinkList}>
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
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              exact
              to="/my-spots"
            >
              my spots
            </NavLink>
            <SpotAddModal isUsingUserLocation={true}/>
          </div>
        </div>
        <div className={styles.navbarRight}>{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;