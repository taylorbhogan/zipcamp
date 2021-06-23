import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'
import { createSpot } from '../../store/spots';

function SpotAddForm(){
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([])
  const [name, setName] = useState('')
  const [lat, setLat] = useState('')
  const [long , setLong] = useState('')
  const [blurb , setBlurb] = useState('')
  const [directions , setDirections] = useState('')
  // figure out what the state object will look like
  const areas = useSelector((state) => Object.values(state.areas))
  const [ area, setArea ] = useState(areas[0])
  const usStates = useSelector(state => Object.values(state.states));
  const [ stateId, setStateId ] = useState(areas[0])


  useEffect(() => {
    dispatch(getAreas());
  },[dispatch])

  useEffect(() => {
    dispatch(getUsStates());
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
// 2. submit form
//***build our payload
//***dispatch the thunk creator from form
//***act on the response
    const newSpot = {
      name,
      lat,
      long,
      blurb,
      directions,
      areaId: 1,
      stateId: 1,
      userId: 1,
      id: 9
    };

    //dispatch is an asynchronous function
    let createdSpot = await dispatch(createSpot(newSpot))
    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
      // hideForm();
    }
  };


  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   // replicate click elsewhere? or is this why sites have that floating x top right...
  // };

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
          {/* check for later: any hiccups with the textareas not being inputs? */}
        <textarea
          type="text"
          className={'formInput'}
          value={blurb}
          placeholder={' what\'s the deal?'}
          onChange={(e) => setBlurb(e.target.value)}
          required
          />
        <textarea
          type="text"
          className={'formInput'}
          value={directions}
          placeholder={' how do you find your way back?'}
          onChange={(e) => setDirections(e.target.value)}
          required
          />
        <select onChange={(e) => setArea(e.target.value)}>
          {areas.map(area =>
            <option key={area.id}>{area.name}</option>
            )}
        </select>
        <select onChange={(e) => setStateId(e.target.value)}>
          {usStates.map(state =>
            <option key={state.id}>{state.name}</option>
            )}
        </select>
        <button
          type="submit"
          className={'submitButton'}
        >Create new Spot</button>
      </form>
    </div>
  )
}

export default SpotAddForm;
