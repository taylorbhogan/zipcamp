import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// out with the old
// import { getSpots } from '../../store/spots';
// in with the new
// import { getTips } from '../../store/tips'

import styles from './TipsList.module.css'
// import SpotBox from '../SpotBox';
// import TipBox from '../TipBox'
// import SpotAddModal from '../SpotAddModal';
// import TipAddModal from '../TipAddModal'

function TipsList(){
  // declare variables from hooks
  const dispatch = useDispatch();
  // useSelector accepts a single function, which we call a selector function.
  // A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
  const spots = useSelector((state) => Object.values(state.spots.allSpots))

  const tips = useSelector((state) => Object.values(state.tips.allTips))
// I'm not sure what this should look like. Let's see if getting to the backend makes it make more sense

  // use the react hook useEffect to cause a side effect, which will fire off dispatch to the store.
  // we'll get data back because we're subscribed via useSelector
  useEffect(() => {
    // console.log("inside the SpotsList useEffect");
    dispatch(getSpots())
  }, [dispatch])

  return(
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.topWrapper}>
          <div className={styles.topContainer}>
            <span>
              scroll for possibilities, or
            </span>
              <TipAddModal />
          </div>
        </div>
        {spots.map((spot) => <SpotBox key={spot.id} spot={spot} />)}
      </div>
    </div>
  )
}

export default TipsList;
