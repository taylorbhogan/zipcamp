import React from 'react';
import {Link} from 'react-router-dom'
// import { useDispatch } from 'react-redux';
import styles from './StandardLinkButton.module.css'

function StandardLinkButton({buttonText, lightBackground, href}){
  let buttonStyle;

  if (lightBackground){
    buttonStyle = {
      color: 'black',
      borderColor: 'black',
    }
  }

  // const setCurrSpot = (spotId) => {
  //   let newCurrSpot = await useDispatch(setCurrentSpot(spotId))
  // }

  // const submitStyle = {
  //   color: 'green'
  // }

  return (
    <Link
      className={styles.standardLinkButton}
      to={href}
      style={buttonStyle}
      // onClick={setCurrSpot}
      // onMouseOver={e => e.target.style = submitStyle}
      >{buttonText}</Link>
    )
}

export default StandardLinkButton;
