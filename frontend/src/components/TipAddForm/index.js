import React, { useState } from 'react'
// import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
// import { getAreas } from '../../store/areas'
// import { getUsStates } from '../../store/usStates'
import '../../index.css'
// import { createSpot } from '../../store/spots';
import { createTip } from '../../store/tips';
import styles from './TipAddForm.module.css'

function TipAddForm({setShowTipAddModal}){
  //
  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} = useParams();

  const [errors, setErrors] = useState([])

  // this is COMPONENT STATE (not redux state)
  // which is why we can access this right here -- we have to use useSelector to get Redux's state
  // because we can access this right here, we can prop thread to pass this info down
  // it's never going to change in my dev tools because I'm only naming it here.
  // it is only called blurb and setBlurb IN THIS FILE.
  const [tipText , setTipText] = useState('')
  // useSelector pulls the info from state, where it was put by
  // const areas = useSelector((state) => Object.values(state.areas))
  // const [ area, setArea ] = useState('1')
  // const usStates = useSelector(state => Object.values(state.states));
  // const [ stateId, setStateId ] = useState('1')
  const userId = useSelector(state => state.session.user?.id);


  // useEffect(() => {
  //   dispatch(getAreas());
  // },[dispatch])

  // useEffect(() => {
  //   dispatch(getUsStates());
  // },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if(!tipText) errors.push('Please add a tip!');

    setErrors(errors)

  //use the values set in state by the form inputs to build our payload
    const newTip = {

      userId,
      spotId,
      text: tipText,
      tipRating: 0
      // directions,
      // areaId: +area,
      // stateId: +stateId,
    };
// console.log(newTip);

    //await the dispatch of the thunk creator
    let createdTip = await dispatch(createTip(newTip))
    // console.log("createdTip", createdTip);
    if (createdTip) {
      //act on the response
      setShowTipAddModal(false)
      history.push(`/spots/${spotId}`);
    }
  };


  return(

    <div
      className={styles.addTipFormWrapper}
    >
      <form
        className='form'
        onSubmit={handleSubmit}
        >
        <h1
          className={'formHeader'}
        >add a tip</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <textarea
          type="text"
          className={'formTextAreaInput'}
          value={tipText}
          placeholder={' what do you want to remember for next time?'}
          onChange={(e) => setTipText(e.target.value)}
          />
        <button
          type="submit"
          className={'submitButton'}
        >Add your tip</button>
      </form>
    </div>
  )
}

export default TipAddForm;
