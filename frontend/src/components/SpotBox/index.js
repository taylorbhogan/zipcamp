import React from 'react'
import styles from './SpotBox.module.css'
import ShowSpotIdButton from '../ShowSpotIdButton';

function SpotBox({spot}){

  return(
    <div className={styles.spotBoxWrapper}>
      <div className={styles.spotBoxContainer}>
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}>
            <img
              className={styles.spotImage}
              alt={'a glimpse of this spot'}
              src={spot.SpotImages[0]?.imgUrl}
            />
          </div>
        </div>
        <div className={styles.spotBoxContainerRight}>
          <div className={styles.spotName}>{spot.name}</div>
          <div className={styles.locationDiv}>
            <div className={styles.areaName}>{spot.Area?.name}</div>
            <div className={styles.stateName}>{spot.State?.name}</div>
          </div>
          <div className={styles.spotBlurb}>{spot.blurb}</div>
          <ShowSpotIdButton
            buttonText={'Check it out'}
            lightBackground={true}
            spotId={spot.id}
            href={`/spots/${spot.id}`}/>
        </div>
      </div>
    </div>
  )
}

export default SpotBox;
