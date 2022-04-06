import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styles from "./ProfileButton.module.css";

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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <button className={styles.accountButton} onClick={openMenu}>
        <div className={styles.faUserParent}>
          <span>Account</span>
        </div>
      </button>
      {showMenu && (
        <div className={styles.profileDropdown}>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <button onClick={logout} className={styles.warningButton}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
