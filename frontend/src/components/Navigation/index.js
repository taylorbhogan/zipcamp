import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import styles from './Navigation.module.css';
import * as sessionActions from '../../store/session'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);


  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({ credential: "Levi Shaber", password: "password" })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

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
        <div>
          <LoginFormModal />
        </div>
        <div>
          <button
            className={styles.demoLoginButton}
            onClick={handleDemoLogin}
            >try it out</button>
        </div>
        <div>
          <Link
            to='/signup'
            className={styles.underline}
            >
            <div
              className={styles.signUpLink}
            >
            <p
              className={styles.join}
            >join</p>
            </div>
            </Link>
        </div>
        <div
         className={styles.errorDiv}
        >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Link
            className={styles.navbarLogoLink}
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
          {/* <div>
            Welcome back,
          </div> */}
          <div  className={styles.sessionLinks}>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
