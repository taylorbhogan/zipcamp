import React from 'react'
import styles from './SpotBox.module.css'
import ShowSpotIdButton from '../ShowSpotIdButton';
// import ActivityIcon from '../ActivityIcon';
// import spotsReducer from '../../store/spots';
// import asdf from '../../images/spotImages/spotImage1.png'

function SpotBox({spot}){
  // let imgUrl;
  // if (spot.spotImages){
    const imgUrl = spot.SpotImages[0]?.imgUrl
  // }
// console.log(imgUrl);

  return(
    <div className={styles.spotBoxWrapper}>
      <div className={styles.spotBoxContainer}>
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}>
            <div
              className={styles.spotImage}
              // style={{backgroundImage: `url(../../images/spotImages/spotImage1.png)`}}
              // style={spot.SpotImages.length !== 0 ? {backgroundImage: `url(../../images/spotImages/${imgUrl})`} : {backgroundImage: `url(../../images/spotImages/spotImage0.png})`}}
              // style={spot.SpotImages.length === 0 ? {backgroundImage: `url(../../images/spotImages/spotImage0.png})`} : {backgroundImage: `url(../../images/spotImages/${imgUrl})`} }
              // style={spot.SpotImages.length === 0 ?  {backgroundImage: `url(../../images/spotImages/${imgUrl})`} :  {backgroundImage: `url(../../images/spotImages/spotImage0.png})`} }
              // THIS WORKS
              style={spot.SpotImages.length === 0 ? {backgroundColor: 'black'} : {backgroundImage: `url(../../images/spotImages/${imgUrl})`} }
              // style={{backgroundImage: `url(../../images/spotImages/spotImage0)`} }
            >
              {/* {<h2>{imgUrl}</h2>} */}
            </div>
            {/* <img
              className={styles.spotImage}
              alt={'a glimpse of this spot'}
              // src='../../images/spotImages/spotImage1.png'
              // style={{backgroundImage: `url(../../images/spotImages/spotImage1.png)`}}
            /> */}
          </div>
          {/* <div className={styles.activityDiv}>
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
          </div> */}
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
