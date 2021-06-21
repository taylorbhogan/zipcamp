import React from 'react'
import styles from './AreaBox.module.css'
// import StandardLinkButton from '../StandardLinkButton';
// import ActivityIcon from '../ActivityIcon';

function AreaBox(){
  return(
    <div className={styles.areaBoxWrapper}>
      <div className={styles.areaBoxContainer}>
        <div className={styles.areaBoxContainerLeft}>
          <div className={styles.areaImageDiv}>
            <img
              className={styles.areaImage}
              alt={'a glimpse of this area'}
              src={''}
            />
          </div>
          <div className={styles.activityDiv}>

          </div>
        </div>
        <div className={styles.areaBoxContainerRight}>
          <div className={styles.areaName}>Lassen National Forest</div>
          <div className={styles.locationDiv}>
            <div className={styles.areaName}></div>
            <div className={styles.stateAbbreviation}>California</div>
          </div>
          <div className={styles.spotBlurb}>This spot is a great place to rest before getting an early start for the day.</div>
          {/* <StandardLinkButton buttonText={'Check it out'}/> */}
        </div>
      </div>
    </div>
  )
}

export default AreaBox;
