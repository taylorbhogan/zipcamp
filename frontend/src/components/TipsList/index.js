import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

// out with the old
// import { getSpots } from '../../store/spots';
// in with the new
import { getTips } from '../../store/tips'

import styles from './TipsList.module.css'
// import SpotBox from '../SpotBox';
import TipBox from '../TipBox'
// import SpotAddModal from '../SpotAddModal';
import TipAddModal from '../TipAddModal'

function TipsList(){
  // declare variables from hooks
  const dispatch = useDispatch();
  const {spotId} = useParams()
  // useSelector accepts a single function, which we call a selector function.
  // A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
  const spots = useSelector((state) => Object.values(state.spots.allSpots))

  // const allKindsOfTips = useSelector((state) => state.tips)
  const tips = useSelector((state) => Object.values(state.tips.allTips))
  const thisSpotTips = tips.filter(tip=> {
    return tip.spotId === +spotId
  })
  // now that I have this array, I'd like to sort it by create date
  // const sortTips = (tips) => {
  //   return tips.sort((tipA, tipB) => {
  //     return tipA.createdAt - tipB.createdAt;
  //   });
  //   // }).map((tip) => tip.createdAt);
  // };
  // sortTips(thisSpotTips)


// I'm not sure what this should look like. Let's see if getting to the backend makes it make more sense

  // use the react hook useEffect to cause a side effect, which will fire off dispatch to the store.
  // we'll get data back because we're subscribed via useSelector
  useEffect(() => {
    console.log("inside the TipsList useEffect");
    dispatch(getTips())
  }, [dispatch])

  return(
    <div className={styles.sectionContainer}>
      <TipAddModal />
      <div className={styles.contentContainer}>
        {thisSpotTips.map((tip) => <TipBox key={tip.id} tip={tip} />)}
      </div>
    </div>
  )
}

export default TipsList;
