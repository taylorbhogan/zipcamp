import React from 'react'
import styles from './AreaBox.module.css'
import StandardLinkButton from '../StandardLinkButton';
// import ActivityIcon from '../ActivityIcon';

function AreaBox({area}){
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
        </div>
        <div className={styles.areaBoxContainerRight}>
          <h1 className={styles.areaName}>{area.name}</h1>
          <div className={styles.locationDiv}>
            <div className={styles.areaName}></div>
            <div className={styles.stateName}>{area?.State?.name}</div>
          </div>
          {/* <div className={styles.spotBlurb}>In 2017, three wolf pups were born in this forest. Their mother is a female wolf of unknown origins. Their father is the son of OR7, a wolf with a tracking device that was the first of its kind in almost a century to migrate into California from Oregon. As of July 2020, the pack has 14 members, with 8 new pups. The father of the pups is not related to any of the other California wolves and joined the pack in 2019.</div> */}
          {/* <StandardLinkButton
            buttonText={'Check it out'}
            lightBackground={true}
            href=''/> */}
        </div>
      </div>
    </div>
  )
}

export default AreaBox;
