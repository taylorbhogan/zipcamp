import React from 'react'
import styles from './TipBox.module.css'
import SpotIdButton from '../ShowSpotIdButton';
import ActivityIcon from '../ActivityIcon';
import spotsReducer from '../../store/spots';

function TipBox({tip}){
  console.log("THIS IS A TIP LOG",tip);
  return(
    <div className={styles.spotBoxWrapper}>
      <div className={styles.spotBoxContainer}>
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}>
            {/* <img
              className={styles.spotImage}
              alt={'a glimpse of this spot'}
              src={''}
            /> */}
          <div className={styles.profileImage}></div>
          </div>

        </div>
        <div className={styles.spotBoxContainerRight}>
          {/* <div className={styles.spotName}>{tip.id}</div> */}
          <div className={styles.locationDiv}>
            <div className={styles.areaName}>{tip.User.username} wrote:</div>
            <div className={styles.areaName}>Rating: {tip.rating}</div>
            {/* <div className={styles.areaName}>{tip.createdAt}</div> */}
          </div>
          <div className={styles.spotBlurb}>{tip.text}</div>
          {/* <SpotIdButton
            buttonText={'Check it out'}
            lightBackground={true}
            // spotId={spot.id}
            href={`/spots`}/> */}
        </div>
      </div>
    </div>
  )
}

export default TipBox;
