import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'
import { editSpot } from '../../store/spots';

function SpotEditForm({spotId}){
  //
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([])

  const spot = useSelector((state) => state.spots[spotId])
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
      history.push(`/spots/${editedSpot.id}`);
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
        >hello from spot add form</h1>
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
          required
          />
        <input
          type="text"
          className={'formInput'}
          value={lat}
          placeholder={' the most helpful latitude for retracing your steps'}
          onChange={(e) => setLat(e.target.value)}
          required
          />
        <input
          type="text"
          className={'formInput'}
          value={long}
          placeholder={' ditto the longitude'}
          onChange={(e) => setLong(e.target.value)}
          required
          />
        <textarea
          type="text"
          className={'formTextAreaInput'}
          value={blurb}
          placeholder={' what\'s the deal?'}
          onChange={(e) => setBlurb(e.target.value)}
          required
          />
        <textarea
          type="text"
          className={'formTextAreaInput'}
          value={directions}
          placeholder={' how do you find your way back?'}
          onChange={(e) => setDirections(e.target.value)}
          required
          />
        <select
          onChange={(e) => setArea(e.target.value)}
          className={'formSelectInput'}
          >
          {areas.map(area =>
            <option
              selected={area.id === spot?.Area?.id}
              value={area.id}
              key={area.id}>{area.name}</option>
            )}
        </select>
        <select
          onChange={(e) => setStateId(e.target.value)}
          className={'formSelectInput'}
          >
          {usStates.map(state =>
            <option
            selected={state.id === spot?.State?.id}
            value={state.id}
              key={state.id}>{state.name}</option>
            )}
        </select>
        <button
          type="submit"
          className={'submitButton'}
        >Save your changes</button>
      </form>
    </div>
  )
}

export default SpotEditForm;
