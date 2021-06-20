import React from 'react';
import styles from './StandardLinkButton.module.css'

function StandardLinkButton({buttonText, href}){
  return (
    <a
      className={styles.standardLinkButton}
      href={href}
      >{buttonText}</a>
    )
}

export default StandardLinkButton;
