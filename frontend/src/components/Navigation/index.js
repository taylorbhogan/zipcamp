import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoLoginButton from '../parts/DemoLoginButton';
import styles from './Navigation.module.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
        <DemoLoginButton buttonText={'try it out'} />
        <NavLink to='/signup' className={styles.signUpLink}>join</NavLink>
      </div>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <NavLink
            className={styles.navbarLogo}
            exact to='/'
          >
            zipcamp
          </NavLink>
          <div className={styles.navLinkList}>
            <NavLink
              className={styles.navLink}
              id={styles.home}
              activeClassName={styles.navLinkActive}
              exact to='/'>home</NavLink>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              exact to='/spots'>spots</NavLink>
            {/* <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              exact to='/areas'>public lands</NavLink> */}
            {/* <NavLink
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                exact to ='/users/adventures'>upcoming adventures</NavLink> */}
          </div>
        </div>
        <div className={styles.navbarRight}>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
