import { csrfFetch } from './csrf';


// Front-to-back: step 3
// Define action types as constants
const LOAD_AREAS = 'areas/LOAD_AREAS'

// Front-to-back: step 2
// define action creators
const load = (areas) => ({
  type: LOAD_AREAS,
  areas
})

// Front-to-back: step 1
// define thunk creators
export const getAreas = () => async dispatch => {
  // TODO: complete the api call?
  const res = await csrfFetch(`/api/areas`);

  if (res.ok) {
    const areas = await res.json();
    // rename the load function?
    dispatch(load(areas));
  }
}

export const searchAreas = (designation, location) => async dispatch => {
  console.log('designation, location---------------->',designation, location);
  const res = await csrfFetch('/api/areas/search',{
    method: 'POST',
    body: JSON.stringify({
      designation, location
    }),
  })

  if (res.ok) {
    const filteredAreas = await res.json()
    dispatch(load(filteredAreas))
  }
}


// Front-to-back: step 4
// define an initial state
const initialState = {};

// Front-to-back: step 5
// define a reducer
const areasReducer = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_AREAS:
      console.log('inside LOAD AREAS');
      const newState = {};
      action.areas.forEach((area) => {
        newState[area.id] = area;
      })
      return {
        ...newState
      }
    default:
      return state
  }
}


// export the reducer
export default areasReducer;
