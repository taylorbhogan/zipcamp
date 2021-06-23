import React from 'react'
import styles from './SpotBox.module.css'
import StandardLinkButton from '../StandardLinkButton';
import ActivityIcon from '../ActivityIcon';
import spotsReducer from '../../store/spots';

function SpotBox({spot}){
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
          </div>
        </div>
        <div className={styles.spotBoxContainerRight}>
          <div className={styles.spotName}>{spot.name}</div>
          <div className={styles.locationDiv}>
            <div className={styles.areaName}>{spot.Area?.name}</div>
            <div className={styles.stateAbbreviation}>{spot.State?.name}</div>
          </div>
          <div className={styles.spotBlurb}>{spot.blurb}</div>
          <StandardLinkButton
            buttonText={'Check it out'}
            lightBackground={true}
            href={`/spots/${spot.id}`}/>
        </div>
      </div>
    </div>
  )
}

export default SpotBox;
