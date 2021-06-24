// import React, {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAreas } from '../../store/areas'
// import { getUsStates } from '../../store/usStates'
// import '../../index.css'
// import { getSpot } from '../../store/spots'
// // import { editSpot } from '../../store/spots'

// function SpotEditForm({spotId}){
//   const dispatch = useDispatch();
//   // is the state shared here? or can I use a new errors even though I declared one in LoginForm.js?
//   // const spots = useSelector((state) => Object.values(state.spots))
//   const spot = useSelector((state) => state.spots[spotId])
//   const [errors, setErrors] = useState([])
//   const [name, setname] = useState(spot?.name)
//   const [lat, setLat] = useState(spot?.lat)
//   const [long , setLong] = useState(spot?.long)
//   const [blurb , setBlurb] = useState(spot?.blurb)
//   const [directions , setDirections] = useState(spot?.directions)
//   // figure out what the state object will look like
//   const [areaId, setAreaId] = useState(spot?.areaId)



//   const areas = useSelector((state) => Object.values(state.areas))
//   // const areaIds = areas.map(area => {
//   //   return area.id
//   // })
//   // const areastosee = useSelector((state) => (state.areas))
//   // const [ area, setArea ] = useState(areas[0])
//   // const [ area, setArea ] = useState(spot?.Area?.name)
//   const [ area, setArea ] = useState('')
//   const usStates = useSelector(state => Object.values(state.states));
//   // const [ stateId, setStateId ] = useState(areas[0])
//   const [ stateId, setStateId ] = useState('')

//   useEffect(() => {
//     dispatch(getSpot(spotId));
//   },[dispatch, spotId])

//   useEffect(() => {
//     dispatch(getAreas());
//   },[dispatch])

//   useEffect(() => {
//     dispatch(getUsStates());
//   },[dispatch])


//   const handleSubmit = async (e) => {
//     console.log('inside the handle submit function');
//     e.preventDefault();

//     const payload = {
//       // ...spot,
//       // name,
//       // lat,
//       // long,
//       // blurb,
//       // directions,
//       // area,
//       // stateId,
//     };
//     // console.log(areaIds);
//   //   let updatedSpot = await dispatch(editSpot(payload))
//   //   if (updatedSpot) {
//   //     // history.push(`/pokemon/${updatedPokemon.id}`)
//   //     // hideForm();
//   //     console.log('updated the spot!');
//   //   }
//   };

//   // const handleCancelClick = (e) => {
//   //   e.preventDefault();
//   //   // replicate click elsewhere? or is this why sites have that floating x top right...
//   // };

//   return(
//     <div>
//       <form
//         className='form'
//         onSubmit={handleSubmit}
//         >
//         <h1
//           className={'formHeader'}
//         >hello from spot edit form</h1>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <input
//           type="text"
//           className={'formInput'}
//           value={name}
//           placeholder={' spot name'}
//           onChange={(e) => setname(e.target.value)}
//           required
//           />
//         <input
//           type="text"
//           className={'formInput'}
//           value={lat}
//           placeholder={' the most helpful latitude for retracing your steps'}
//           onChange={(e) => setLat(e.target.value)}
//           required
//           />
//         <input
//           type="text"
//           className={'formInput'}
//           value={long}
//           placeholder={' ditto the longitude'}
//           onChange={(e) => setLong(e.target.value)}
//           required
//           />
//           {/* check for later: any hiccups with the textareas not being inputs? */}
//         <textarea
//           type="text"
//           className={'formInput'}
//           value={blurb}
//           placeholder={' what\'s the deal?'}
//           onChange={(e) => setBlurb(e.target.value)}
//           required
//           />
//         <textarea
//           type="text"
//           className={'formInput'}
//           value={directions}
//           placeholder={' how do you find your way back?'}
//           onChange={(e) => setDirections(e.target.value)}
//           required
//           />
//         <select
//         //
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//         >
//           {areas.map(area =>
//             <option
//             // the one that's preselected is the one that's already set
//               selected={area.id === spot?.Area?.id}
//               // display the area name
//               key={area.id}>{area.name}

//             </option>
//             )}
//         </select>
//         <select
//           value={stateId}
//           onChange={(e) => setStateId(e.target.value)}
//         >
//           {usStates.map(state =>
//             <option
//               selected={state.id === spot?.State?.id}
//               key={state.id}>{state.name}
//             </option>
//             )}
//         </select>
//         <button
//           type="submit"
//           className={'submitButton'}
//         >Save your changes</button>
//       </form>
//     </div>
//   )
// }

// export default SpotEditForm;
