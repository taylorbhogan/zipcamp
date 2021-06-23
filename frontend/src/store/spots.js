import { csrfFetch } from './csrf';


// Define action types as constants
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT = 'spots/SET_SPOT'
const ADD_ONE = 'spots/ADD_ONE'

// define action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
})
export const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
})
const addOneSpot = spot => ({
  type: ADD_ONE,
  spot,
});

// define thunk creators
export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  if (res.ok){
    const spots = await res.json();
    dispatch(setSpots(spots));
  }
}
export const getSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok){
    const spot = await res.json();
    dispatch(setSpot(spot));
  }
}

//phase 3: create a thunk action creator for creating a pokemon
export const createSpot = (formData) => async dispatch  => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  if (response.ok) {
    const newSpotData = await response.json();
    dispatch(addOneSpot(newSpotData))
    //the store is now updated because POST was successful
    return newSpotData
  }
}


// export const editSpot = (editData) => async (dispatch) => {
//   console.log('inside the editSpot function');
//   const res = await csrfFetch(`/api/spots/${editData.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(editData)
//   })
//   if (res.ok){
//     const editSpotData = await res.json();
//     dispatch(addOneSpot(editSpotData))
//     return editSpotData;
//   }

// }



// define an initial state
const initialState = {};

// define a reducer
const spotsReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_SPOTS:
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      })
      return {
        ...state,
        ...allSpots,
      }
    case SET_SPOT:
      const thisSpot = {};
      // console.log("action.spot", action.spot)
      thisSpot[action.spot.id] = action.spot;
      return {
        // ...state,
        ...thisSpot
      }
    case ADD_ONE:
      if (!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        }
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.state.id],
          ...action.state
        }
      }

    default:
      return state
  }
}

// export the reducer
export default spotsReducer;
