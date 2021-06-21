import React from 'react'
import styles from './SpotBox.module.css'
import StandardLinkButton from '../StandardLinkButton';
import ActivityIcon from '../ActivityIcon';

function SpotBox(){
  return(
    <div className={styles.spotBoxWrapper}>
      <div className={styles.spotBoxContainer}>
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}>
            <img
              className={styles.spotImage}
              alt={'a glimpse of this spot'}
              src={''}
            />
          </div>
          <div className={styles.activityDiv}>
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
          </div>
        </div>
        <div className={styles.spotBoxContainerRight}>
          <div className={styles.spotName}>Groovy Spot</div>
          <div className={styles.locationDiv}>
            <div className={styles.areaName}>Lassen National Forest</div>
            <div className={styles.stateAbbreviation}>California</div>
          </div>
          <div className={styles.spotBlurb}>This spot is a great place to rest before getting an early start for the day.</div>
          <StandardLinkButton
            buttonText={'Check it out'}
            lightBackground={true}
            href=''/>
        </div>
      </div>
    </div>
  )
}

export default SpotBox;
