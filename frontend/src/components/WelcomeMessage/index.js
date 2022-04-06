import React from "react";
import StandardLinkButton from "./../StandardLinkButton";
import styles from "./WelcomeMessage.module.css";
import "./../../index.css";

function WelcomeMessage() {
  const buttonText = "find your way";
  const buttonHref = "/spots";
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.welcomeMessageBox}>
        <p className={styles.welcomeMessage}>
          the clearest way into the universe is through a forest wilderness.
        </p>
        <StandardLinkButton buttonText={buttonText} href={buttonHref} />
      </div>
    </div>
  );
}

export default WelcomeMessage;
