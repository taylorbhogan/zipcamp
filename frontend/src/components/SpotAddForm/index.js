import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getAreas } from '../../store/areas'
import { getUsStates } from '../../store/usStates'
import '../../index.css'
import styles from './SpotAddForm.module.css'
import { createSpot } from '../../store/spots';
import MapContainer from '../Maps';


function SpotAddForm(){
  //
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([])

  const [name, setName] = useState('')
  const [lat, setLat] = useState('')
  const [long , setLong] = useState('')
  const [blurb , setBlurb] = useState('')
  // this is COMPONENT STATE (not redux state)
  // which is why we can access this right here -- we have to use useSelector to get Redux's state
  // because we can access this right here, we can prop thread to pass this info down
  // it's never going to change in my dev tools because I'm only naming it here.
  // it is only called blurb and setBlurb IN THIS FILE.
  const [directions , setDirections] = useState('')
  // useSelector pulls the info from state, where it was put by
  const areas = useSelector((state) => Object.values(state.areas))
  const [ area, setArea ] = useState('1')
  // const usStates = useSelector(state => Object.values(state.states));
  // const [ stateId, setStateId ] = useState('1')
  const userId = useSelector(state => state.session.user?.id);
  // const [location, setLocation] = useState({})


  //This is where we validate. Is useEffect the right choice here? Would it be better to move it to a handleSubmit function as in SignupFormPage?
  // useEffect(()=>{
  //   const errors = [];
  //   if(!name) errors.push('Please add a spot name.');
  //   if(!lat) errors.push('Please add a latitude.')
  //   if(!long) errors.push('Please add a longitude.')
  //   if(!blurb) errors.push('you gotta give us a LITTLE something on the situation!')
  //   setErrors(errors)
  // },[name,lat,long,blurb,directions])

  useEffect(() => {
    dispatch(getAreas());
  },[dispatch])

  useEffect(() => {
    dispatch(getUsStates());
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if(!name) errors.push('Please add a spot name.');
    if(!lat) errors.push('Please add a latitude.')
    if(!long) errors.push('Please add a longitude.')
    if(!blurb) errors.push('you gotta give us a LITTLE something on the situation!')
    setErrors(errors)



    const land = areas.find(land => land.id === +area)
    console.log('this is land', land);
    console.log('this is land.State.id', land.State.id);

  //use the values set in state by the form inputs to build our payload
    const newSpot = {
      name,
      lat,
      long,
      blurb,
      directions,
      areaId: +area,
      // stateId: +stateId,
      stateId: land.State.id,
      userId,
    };
// console.log(newSpot);

    //await the dispatch of the thunk creator
    let createdSpot = await dispatch(createSpot(newSpot))
    // console.log("createdSpot", createdSpot);
    if (createdSpot) {
      //act on the response
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  const getLocation = coords => {
    // console.log("inside getLocation",coords);
    // setLocation(coords);
    setLat(coords.lat.toFixed(6))
    setLong(coords.lng.toFixed(6))
    // setShowMap(false);
  };

  return(

    <div>
      <form
        className='form'
        onSubmit={handleSubmit}
        >
        <h1
          className={'formHeader'}
        >add that spot so you can find your way back</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className={styles.containerDiv}>
          <div className={styles.leftDiv}>
            <div className={styles.infoDiv}>
              <input
                type="text"
                className={'formInput'}
                value={name}
                placeholder={' spot name'}
                onChange={(e) => setName(e.target.value)}
                required
                />
              <textarea
                type="text"
                className={styles.blurbInput}
                value={blurb}
                placeholder={' what\'s the deal?'}
                onChange={(e) => setBlurb(e.target.value)}
                required
                />
              <textarea
                type="text"
                className={styles.directionsInput}
                value={directions}
                placeholder={' how do you find your way back?'}
                onChange={(e) => setDirections(e.target.value)}
                />
              <select
                onChange={(e) => setArea(e.target.value)}
                className={'formSelectInput'}
                >
                {areas.map(area =>
                  <option
                    value={area.id}
                    key={area.id}>{area.name}</option>
                  )}
              </select>
              {/* <select
                onChange={(e) => setStateId(e.target.value)}
                className={'formSelectInput'}
                hidden={true}
                >
                {usStates.map(state =>
                  <option
                    value={state.id}
                    key={state.id}>{state.name}</option>
                  )}
              </select> */}
            </div>
            <div className={styles.coordsDiv}>
              <input
                type="text"
                className={styles.coords}
                value={lat}
                placeholder={' latitude: enter manually here, or use the map'}
                onChange={(e) => setLat(e.target.value)}
                required
                hidden={true}
                />
              <input
                type="text"
                hidden={true}
                className={styles.coords}
                value={long}
                placeholder={' ditto the longitude'}
                onChange={(e) => setLong(e.target.value)}
                required
                />

            </div>
          </div>
          <div className={styles.rightDiv}>
            <div>
              <MapContainer
                lat={lat}
                long={long}
                isAdding={true}
                getLocation={getLocation}
              />
            </div>

          </div>
        </div>
        <button
          type="submit"
          hidden={true}
          className={'submitButton'}
        >Create new Spot</button>
      </form>
    </div>
  )
}

export default SpotAddForm;
