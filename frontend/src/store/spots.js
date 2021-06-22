import { csrfFetch } from './csrf';


// Define action types as constants
const SET_SPOTS = 'users/SET_SPOTS';

// define action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
})

// define thunks
export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  // if (res.ok){
    const spots = await res.json();
    dispatch(setSpots(spots));
  // }
}

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
    default:
      return state
  }
}

// export the reducer
export default spotsReducer;
