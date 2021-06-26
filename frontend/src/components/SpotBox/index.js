import React from 'react'
import styles from './SpotBox.module.css'
import SpotIdButton from '../ShowSpotIdButton';
import ActivityIcon from '../ActivityIcon';
// import spotsReducer from '../../store/spots';
// import asdf from '../../images/spotImages/spotImage1.png'

function SpotBox({spot}){
  const imgUrl = spot.SpotImages[0]?.imgUrl


  return(
    <div className={styles.spotBoxWrapper}>
      <div className={styles.spotBoxContainer}>
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}>
            <div
              className={styles.spotImage}
              style={{backgroundImage: `url(../../images/spotImages/spotImage1.png)`}}
            >
            </div>
            {/* <img
              className={styles.spotImage}
              alt={'a glimpse of this spot'}
              // src='../../images/spotImages/spotImage1.png'
              // style={{backgroundImage: `url(../../images/spotImages/spotImage1.png)`}}
            /> */}
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
          <SpotIdButton
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
