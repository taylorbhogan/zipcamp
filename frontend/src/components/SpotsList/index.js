import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSpots } from '../../store/spots';
import styles from './SpotsList.module.css'
import SpotBox from '../SpotBox';

function SpotsList(){
  // declare variables from hooks
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots))

  // use a react hook and cause a side effect
  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return(
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <p>hello</p>
        {spots.map((spot) => <SpotBox key={spot.id} spot={spot} />)}
      </div>
    </div>
  )
}

export default SpotsList;
