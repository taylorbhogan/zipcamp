import React from 'react';
import styles from './StandardLinkButton.module.css'

function StandardLinkButton({buttonText, lightBackground, href}){
  let buttonStyle;

  if (lightBackground){
    buttonStyle = {
      color: 'black',
      borderColor: 'black',
    }
  }

  // const submitStyle = {
  //   color: 'green'
  // }

  return (
    <a
      className={styles.standardLinkButton}
      href={href}
      style={buttonStyle}
      // onMouseOver={e => e.target.style = submitStyle}
      >{buttonText}</a>
    )
}

export default StandardLinkButton;
