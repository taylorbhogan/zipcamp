import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'
// import { editSpot } from '../../store/spots';
import { editTip } from '../../store/tips';

function TipEditForm({spotId, setShowModal, tipId}){
  //
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([])

  // const spot = useSelector((state) => state.spots.allSpots[spotId])
  // // how do I just make the above spot have the stateID already in it?
  // const [name, setName] = useState(spot?.name)
  // const [lat, setLat] = useState(spot?.lat)
  // const [long , setLong] = useState(spot?.long)
  // const [blurb , setBlurb] = useState(spot?.blurb)
  // const [directions , setDirections] = useState(spot?.directions)
  // // useSelector pulls the info from state, where it was put by
  // const areas = useSelector((state) => Object.values(state.areas))
  // const [ area, setArea ] = useState(spot?.areaId)
  // const usStates = useSelector(state => Object.values(state.states));
  // const [ stateId, setStateId ] = useState(spot?.stateId)
  const userId = useSelector(state => state.session.user?.id);
  const tip = useSelector(state => state.tips.allTips[tipId]);

  const [tipText , setTipText] = useState('')



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
    ...tip,
    userId,
    spotId,
    text: tipText,
    tipRating: 0
    // directions,
    // areaId: +area,
    // stateId: +stateId,
  };
// console.log(newSpot);
// TODO: Convert the below to an edit! Done. Just changed the words. Time to do the real work in the store
    //await the dispatch of the thunk creator
    let editedTip = await dispatch(editTip(newTip))
    console.log("editedTip", editedTip);
    if (editedTip) {
      //act on the response
      setShowModal(false)
      history.push(`/spots/${spotId}`);
    }
    // let createdSpot = await dispatch(createSpot(newSpot))
    // console.log("createdSpot", createdSpot);
    // if (createdSpot) {
    //   //act on the response
    //   history.push(`/spots/${createdSpot.id}`);
    // }
  };











  return(

    <div>
      <form
        className='form'
        onSubmit={handleSubmit}
        >
        <h1
          className={'formHeader'}
        >what's important to remember?</h1>
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
        >Save your changes</button>
      </form>
    </div>
  )
}

export default TipEditForm;
