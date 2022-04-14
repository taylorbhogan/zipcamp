import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpots } from '../../store/spots';
import SpotBox from '../SpotBox';
import styles from './SpotsList.module.css'


function SpotsList() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots))

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div className={styles.contentWrapper}>
      <div className={'contentContainer'}>
        {spots.map((spot) => <SpotBox key={spot.id} spot={spot} />)}
      </div>
    </div>
  )
}

export default SpotsList;
