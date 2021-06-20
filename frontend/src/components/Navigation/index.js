import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import styles from './Navigation.module.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div className={styles.navbarLogo}>
            zipcamp
          </div>
          <div className={styles.navlinkList}>
            <span>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to='/'>home</NavLink>
            </span>
            <span>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/spots'>spots</NavLink>
            </span>
            <span>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/areas'>public lands</NavLink>
            </span>
          </div>
        </div>
        <div  className={styles.navbarRight}>
          <div  className={styles.sessionLinks}>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
