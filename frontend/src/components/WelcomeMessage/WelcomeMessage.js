import React from "react";
import StandardLinkButton from "./../StandardLinkButton";
import styles from "./WelcomeMessage.module.css";
import "./../../index.css";

function WelcomeMessage() {
  const buttonText = "find your way";
  const buttonHref = "/areas";
  return (
    <div className={styles.contentContainer}>
      <div className={styles.welcomeMessageBox}>
        <p className={styles.welcomeMessage}>
          the clearest way into the universe is through a forest wilderness.
        </p>
        <div className={styles.buttonWrapper}>
          <StandardLinkButton buttonText={buttonText} href={buttonHref} />
        </div>
      </div>
      <img src="/images/siteBackground/background-star-2.jpg" alt="a stargazing silhouette"/>
    </div>
  );
}

export default WelcomeMessage;
