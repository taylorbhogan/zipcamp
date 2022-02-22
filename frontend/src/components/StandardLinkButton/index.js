import React from "react";
import { Link } from "react-router-dom";
import styles from "./StandardLinkButton.module.css";

function StandardLinkButton({ buttonText, lightBackground, href }) {
  let buttonStyle;

  if (lightBackground) {
    buttonStyle = {
      color: "black",
      borderColor: "black",
    };
  }

  return (
    <Link className={styles.standardLinkButton} to={href} style={buttonStyle}>
      {buttonText}
    </Link>
  );
}

export default StandardLinkButton;
