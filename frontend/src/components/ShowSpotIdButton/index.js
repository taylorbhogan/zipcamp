import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './ShowSpotIdButton.module.css'
import { setCurrentSpot } from '../../store/spots';
import { NavLink } from 'react-router-dom';


function StandardLinkButton({buttonText, lightBackground, href, spotId}){
  let buttonStyle;

  if (lightBackground){
    buttonStyle = {
      // color: 'black',
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
    <NavLink
      className={styles.standardLinkButton}
      to={href}
      style={buttonStyle}
      // onClick={setCurrSpot(spotId)}
      // onMouseOver={e => e.target.style = submitStyle}
      >{buttonText}</NavLink>
    )
}

export default StandardLinkButton;
