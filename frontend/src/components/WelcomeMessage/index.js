import React from 'react';
import styles from './WelcomeMessage.module.css'

function WelcomeMessage(){
  return(
    <div className={styles.welcomeMessageBox}>
      <div className={styles.welcomeMessageBoxContent}></div>
      <p className={styles.welcomeMessage}>the clearest way into the universe is through a forest wilderness.</p>
      <p className={styles.findYourWay}>find your way</p>
    </div>
  )
}

export default WelcomeMessage;
