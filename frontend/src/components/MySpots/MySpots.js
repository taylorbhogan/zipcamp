import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpots } from '../../store/spots';
import SpotBox from '../SpotBox';
import styles from './MySpots.module.css'

const MySpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots))
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div className={styles.contentWrapper}>
      <div className={'contentContainer'}>
        {spots.filter(spot => spot.userId === user.id).map((spot) => <SpotBox key={spot.id} spot={spot} />)}
      </div>
    </div>
  )
}

export default MySpots
