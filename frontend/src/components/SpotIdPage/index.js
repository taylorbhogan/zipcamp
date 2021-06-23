import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './SpotIdPage.module.css'
import { getSpot } from '../../store/spots'
import ActivityIcon from '../ActivityIcon';

function SpotIdPage(){
  // declare variables from hooks
  const dispatch = useDispatch();
  const {spotId} = useParams();
  console.log("THIS IS MY CONSOLE LOG", spotId);
  const spot = useSelector((state) => state.spots[spotId])

  // // use a react hook and cause a side effect
  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch, spotId])


  return(
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.spotImageCarouselUnused}></div>
        <div className={styles.mainSpotDivUnused}>
          <div className={styles.SpotDivHeader}>
            <div className={styles.spotName}>{spot && spot.name}</div>
            <div className={styles.coordinates}>{spot && spot.lat}, {spot && spot.long}</div>
          </div>
          <div className={styles.SpotDivInfo}>
            <div className={styles.SpotDivInfoLeft}>
              <div className={styles.userInfo}>
                <div>Discovered by</div>
                <div>{spot && spot.User.username}</div>
              </div>
              <div className={styles.profileImage}></div>
            </div>
            <div className={styles.SpotDivInfoRight}>
              <div>{spot && spot.blurb}</div>
              <div className={styles.directions}>{spot && spot.directions}</div>
            </div>
          </div>
          <div className={styles.SpotDivActivities}>
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
          </div>


          {/* right now, I need the spot &&. why? */}
          {/* <p>{spot && spot.id}</p> */}
            <p>. </p>
            <p>. </p>
            <p>. </p>
            <p>. </p>
            <p>. </p>
            <p>hi :)</p>

        </div>
        <div className={styles.TipsUnused}></div>
      </div>
    </div>
  )
}

export default SpotIdPage;
