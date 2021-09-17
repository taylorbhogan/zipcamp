import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpots } from '../../store/spots';
import SpotBox from '../SpotBox';
import SpotAddModal from '../SpotAddModal';
import styles from './SpotsList.module.css'


function SpotsList() {
  const dispatch = useDispatch();
  // useSelector accepts a single function, which we call a selector function.
  // A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
  const spots = useSelector((state) => Object.values(state.spots.allSpots))

  // use the react hook useEffect to cause a side effect, which will fire off dispatch to the store.
  // we'll get data back because we're subscribed via useSelector
  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div className={styles.contentWrapper}>
      <div className={'contentContainer'}>
        <SpotAddModal />
        {spots.map((spot) => <SpotBox key={spot.id} spot={spot} />)}
      </div>
    </div>
  )
}

export default SpotsList;
