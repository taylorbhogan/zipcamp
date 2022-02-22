import React from "react";
import styles from "./ShowSpotIdButton.module.css";
import { NavLink } from "react-router-dom";

function StandardLinkButton({ buttonText, lightBackground, href, spotId }) {
  let buttonStyle;

  if (lightBackground) {
    buttonStyle = {
      borderColor: "black",
    };
  }

  return (
    <NavLink
      className={styles.standardLinkButton}
      to={href}
      style={buttonStyle}
    >
      {buttonText}
    </NavLink>
  );
}

export default StandardLinkButton;
