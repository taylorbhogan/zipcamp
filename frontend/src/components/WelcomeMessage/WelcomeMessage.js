import React from "react";
import StandardLinkButton from "./../StandardLinkButton";
import styles from "./WelcomeMessage.module.css";
import "./../../index.css";

function WelcomeMessage() {
  const buttonText = "find your way";
  const buttonHref = "/areas";
  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <p>the clearest way into the universe is through a forest wilderness.</p>
        <p>expore public lands and save the cool spots you discover.</p>
        <div className={styles.buttonWrapper}>
          <StandardLinkButton buttonText={buttonText} href={buttonHref} />
        </div>
      </div>
      <img
        src="/images/siteBackground/background-star-2.jpg"
        alt="a stargazing silhouette"
      />
    </div>
  );
}

export default WelcomeMessage;
