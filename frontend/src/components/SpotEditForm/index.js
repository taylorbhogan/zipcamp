import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'
import { getSpot } from '../../store/spots'
// import { editSpot } from '../../store/spots'

function SpotEditForm({spotId}){
  const dispatch = useDispatch();
  // is the state shared here? or can I use a new errors even though I declared one in LoginForm.js?
  // const spots = useSelector((state) => Object.values(state.spots))
  const spot = useSelector((state) => state.spots[spotId])
  const [spotErrors, setSpotErrors] = useState([])
  const [spotName, setSpotName] = useState(spot?.name)
  const [spotLat, setSpotLat] = useState(spot?.lat)
  const [spotLong , setSpotLong] = useState(spot?.long)
  const [spotBlurb , setSpotBlurb] = useState(spot?.blurb)
  const [spotDirections , setSpotDirections] = useState(spot?.directions)
  // figure out what the state object will look like
  const areas = useSelector((state) => Object.values(state.areas))
  // const [ area, setArea ] = useState(areas[0])
  const [ area, setArea ] = useState(spot?.Area?.name)
  const usStates = useSelector(state => Object.values(state.states));
  const [ stateId, setStateId ] = useState(areas[0])

  useEffect(() => {
    dispatch(getSpot(spotId));
  },[dispatch, spotId])

  useEffect(() => {
    dispatch(getAreas());
  },[dispatch])

  useEffect(() => {
    dispatch(getUsStates());
  },[dispatch])


  // const handleSubmit = async (e) => {
  //   console.log('inside the handle submit function');
  //   e.preventDefault();

  //   const payload = {
  //     ...spot,
  //     spotName,
  //     spotLat,
  //     spotLong,
  //     spotBlurb,
  //     spotDirections,
  //     area,
  //     stateId,
  //   };

  //   let updatedSpot = await dispatch(editSpot(payload))
  //   if (updatedSpot) {
  //     // history.push(`/pokemon/${updatedPokemon.id}`)
  //     // hideForm();
  //     console.log('updated the spot!');
  //   }
  // };

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   // replicate click elsewhere? or is this why sites have that floating x top right...
  // };

  return(
    <div>
      <form
        className='form'
        // onSubmit={handleSubmit}
        >
        <h1
          className={'formHeader'}
        >hello from spot edit form</h1>
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
            <option
              selected={area.id === spot?.Area?.id}
              key={area.id}>{area.name}
            </option>
            )}
        </select>
        <select onChange={(e) => setStateId(e.target.value)}>
          {usStates.map(state =>
            <option
              selected={state.id === spot?.State?.id}
              key={state.id}>{state.name}
            </option>
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
