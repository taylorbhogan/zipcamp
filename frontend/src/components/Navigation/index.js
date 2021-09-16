// import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoLoginButton from '../parts/DemoLoginButton';
import styles from './Navigation.module.css';
// import * as sessionActions from '../../store/session'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div
        className={styles.welcomeDiv}
      >
        <div className={styles.levi}>
          Welcome back, {sessionUser.username}.
        </div>
        <ProfileButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <div className={styles.sessionLinksDiv}>
        <LoginFormModal />
        <DemoLoginButton buttonText={'try it out'} />
        <Link to='/signup' className={styles.signUpLink}>join</Link>
      </div>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Link
            className={styles.removeUnderline}
            exact to='/'>
            <div className={styles.navbarLogo}>
              zipcamp
            </div>
          </Link>
          <div className={styles.navLinkList}>
            <div>
              <NavLink
                className={styles.navLink}
                id={styles.home}
                activeClassName={styles.navLinkActive}
                exact to='/'>home</NavLink>
            </div>
            <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to='/spots'>spots</NavLink>
            </div>
            {/* <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/areas'>public lands</NavLink>
            </div> */}
            {/* <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/users/adventures'>upcoming adventures</NavLink>
            </div> */}
          </div>
        </div>
        <div className={styles.navbarRight}>
          <div className={styles.sessionLinks}>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
