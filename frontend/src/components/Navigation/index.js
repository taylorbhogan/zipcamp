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
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
      </ul>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
