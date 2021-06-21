import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import styles from './ProfileButton.module.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className={styles.navbarRight}>
      <div className={styles.buttonWrapper}>
        <button className={styles.accountButton} onClick={openMenu}>
          {/* Now you can use any of the free icons available in Font Awesome by adding the <i> element with the desired className to ber rendered in a React component. To change the size or color of the icon, wrap the <i> element in a parent element like a div. Manipulating the font-size of the parent element changes the size of the icon. The color of the parent element will be the color of the icon.  */}
          <div className={styles.faUserParent}>
            <span>Account</span>
            <i className="fas fa-user-circle" />
          </div>
        </button>
      </div>
      {showMenu && (
        <div className={styles.profileDropdown}>
          <div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>
              <button
                onClick={logout}
                className={styles.warningButton}
              >Log Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
