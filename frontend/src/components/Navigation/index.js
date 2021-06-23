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
      <div className={styles.sessionLinksDiv}>
        <div>
          <LoginFormModal />
        </div>
        <div>
          <NavLink to='/signup'>Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>w
          <div className={styles.navbarLogo}>
            zipcamp
          </div>
          <div className={styles.navLinkList}>
            <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to='/'>home</NavLink>
            </div>
            <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/spots'>spots</NavLink>
            </div>
            <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/areas'>public lands</NavLink>
            </div>
            <div>
              <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/users/adventures'>upcoming adventures</NavLink>
            </div>
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
