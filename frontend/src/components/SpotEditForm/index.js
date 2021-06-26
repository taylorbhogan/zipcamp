import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'
import { editSpot } from '../../store/spots';
import { deleteSpot } from '../../store/spots'
import styles from './SpotEditForm.module.css'

function SpotEditForm({spotId, setShowModal}){
  //
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([])

  const spot = useSelector((state) => state.spots.allSpots[spotId])
  // how do I just make the above spot have the stateID already in it?
  const [name, setName] = useState(spot?.name)
  const [lat, setLat] = useState(spot?.lat)
  const [long , setLong] = useState(spot?.long)
  const [blurb , setBlurb] = useState(spot?.blurb)
  const [directions , setDirections] = useState(spot?.directions)
  // useSelector pulls the info from state, where it was put by
  const areas = useSelector((state) => Object.values(state.areas))
  const [ area, setArea ] = useState(spot?.areaId)
  const usStates = useSelector(state => Object.values(state.states));
  const [ stateId, setStateId ] = useState(spot?.stateId)
  const userId = useSelector(state => state.session.user.id);




  useEffect(() => {
    dispatch(getAreas());
  },[dispatch])

  useEffect(() => {
    dispatch(getUsStates());
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();


    // console.log("i am e", e);
if (e.target.id !== 8){

    const errors = [];
    if(!name) errors.push('Please add a spot name.');
    if(!lat) errors.push('Please add a latitude.')
    if(!long) errors.push('Please add a longitude.')
    if(!blurb) errors.push('you gotta give us a LITTLE something on the situation!')
    setErrors(errors)

  //use the values set in state by the form inputs to build our payload
  const newSpot = {
    ...spot,
    name,
    lat,
    long,
    blurb,
    directions,
    areaId: +area,
    stateId: +stateId,
    userId,
  };
// console.log(newSpot);
// TODO: Convert the below to an edit! Done. Just changed the words. Time to do the real work in the store
    //await the dispatch of the thunk creator
      let editedSpot = await dispatch(editSpot(newSpot))
      console.log("createdSpot", editedSpot);
      if (editedSpot) {
        //act on the response
        setShowModal(false)
        history.push(`/spots/${editedSpot.id}`);
    }
    // let createdSpot = await dispatch(createSpot(newSpot))
    // console.log("createdSpot", createdSpot);
    // if (createdSpot) {
    //   //act on the response
    //   history.push(`/spots/${createdSpot.id}`);
    // }

    }
  };





  const handleDelete = async (spotId) => {
    // successfully got this far...
    console.log(spotId);
    // dispatch THUNK
    let deletedSpot = await dispatch(deleteSpot(spotId))
    console.log('inside handleDelete in SpotEditForm');
    if (deletedSpot) {
      //act on the response
      history.push(`/spots`);
    }
  }





  return(

    <div className={styles.formContainer}>
      <form
        className='form'
        onSubmit={handleSubmit}
        // onSubmit={e => e.target}
        >
        <h1
          className={'formHeader'}
        >hello from spot edit form</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          className={'formInput'}
          value={name}
          placeholder={' spot name'}
          onChange={(e) => setName(e.target.value)}
          // commented out to show frontend validation error array
          // required
          />
        <input
          type="text"
          className={'formInput'}
          value={lat}
          placeholder={' the most helpful latitude for retracing your steps'}
          onChange={(e) => setLat(e.target.value)}
          // commented out to show frontend validation error array
          // required
          />
        <input
          type="text"
          className={'formInput'}
          value={long}
          placeholder={' ditto the longitude'}
          onChange={(e) => setLong(e.target.value)}
          // commented out to show frontend validation error array
          // required
          />
        <textarea
          type="text"
          className={'formTextAreaInput'}
          value={blurb}
          placeholder={' what\'s the deal?'}
          onChange={(e) => setBlurb(e.target.value)}
          // commented out to show frontend validation error array
          // required
          />
        <textarea
          type="text"
          className={'formTextAreaInput'}
          value={directions}
          placeholder={' how do you find your way back?'}
          onChange={(e) => setDirections(e.target.value)}
          />
        <select
          onChange={(e) => setArea(e.target.value)}
          className={'formSelectInput'}
        // // the change:
        // value={spot.stateId}
        // //
          value={spot?.areaId}
          >
          {areas.map(area =>
            <option
              // selected={area.id === spot?.Area?.id}
              value={area.id}
              key={area.id}>{area.name}</option>
            )}
        </select>
        <select
          // the change:
          value={spot?.stateId}
          //
          onChange={(e) => setStateId(e.target.value)}
          className={'formSelectInput'}
          >
          {usStates.map(state =>
            <option
                      // the change:
            // selected={state.id === spot?.State?.id}
            //
            value={state.id}
              key={state.id}>{state.name}</option>
            )}
        </select>
        <button
          type="submit"
          className={'submitButton'}
        >Save your changes</button>
      </form>
      <button
        onClick={() => handleDelete(spot.id)}
        className={styles.warningButton}
        id={8}
        >
        Delete
      </button>
    </div>
  )
}

export default SpotEditForm;
