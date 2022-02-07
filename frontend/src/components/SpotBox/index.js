import React from 'react'
import styles from './SpotBox.module.css'
import ShowSpotIdButton from '../ShowSpotIdButton';

function SpotBox({ spot }) {
  return (
    <a
    href={`/spots/${spot.id}`}
    className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.spotImageDiv}>
          <img
            className={styles.spotImage}
            alt={'a glimpse of this spot'}
            src={spot.SpotImages ? spot.SpotImages[0]?.imgUrl : null}
          />
        </div>
      </div>
      <div className={styles.containerRight}>
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
          href={`/spots/${spot.id}`} />
      </div>
    </a>
  )
}

export default SpotBox;
