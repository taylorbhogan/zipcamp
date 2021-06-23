import { csrfFetch } from './csrf';


// Define action types as constants
const SET_SPOTS = 'users/SET_SPOTS';
const SET_SPOT = 'users/SET_SPOT'

// define action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
})
export const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
})

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
      console.log("action.spot", action.spot)
      thisSpot[action.spot.id] = action.spot;
      return {
        // ...state,
        ...thisSpot
      }
    default:
      return state
  }
}

// export the reducer
export default spotsReducer;
