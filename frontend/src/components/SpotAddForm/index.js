import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'

function SpotAddForm(){
  const dispatch = useDispatch();
  // is the state shared here? or can I use a new errors even though I declared one in LoginForm.js?
  const [spotErrors, setSpotErrors] = useState([])
  const [spotName, setSpotName] = useState('')
  const [spotLat, setSpotLat] = useState('')
  const [spotLong , setSpotLong] = useState('')
  const [spotBlurb , setSpotBlurb] = useState('')
  const [spotDirections , setSpotDirections] = useState('')
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



  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   // replicate click elsewhere? or is this why sites have that floating x top right...
  // };

  return(
    <div>
      <form
        className='form'
        >
        <h1
          className={'formHeader'}
        >hello from spot add form</h1>
        <ul>
          {spotErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          className={'formInput'}
          value={spotName}
          placeholder={' spot name'}
          onChange={(e) => setSpotName(e.target.value)}
          required
          />
        <input
          type="text"
          className={'formInput'}
          value={spotLat}
          placeholder={' the most helpful latitude for retracing your steps'}
          onChange={(e) => setSpotLat(e.target.value)}
          required
          />
        <input
          type="text"
          className={'formInput'}
          value={spotLong}
          placeholder={' ditto the longitude'}
          onChange={(e) => setSpotLong(e.target.value)}
          required
          />
          {/* check for later: any hiccups with the textareas not being inputs? */}
        <textarea
          type="text"
          className={'formInput'}
          value={spotBlurb}
          placeholder={' what\'s the deal?'}
          onChange={(e) => setSpotBlurb(e.target.value)}
          required
          />
        <textarea
          type="text"
          className={'formInput'}
          value={spotDirections}
          placeholder={' how do you find your way back?'}
          onChange={(e) => setSpotDirections(e.target.value)}
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
