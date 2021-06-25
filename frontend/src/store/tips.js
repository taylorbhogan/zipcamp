// WE ARE IN THE FRONTEND - this is the store, inside a React.JS App run by the web browser.
// we use this module to send fetch requests to the backend, which talks to the db
// we access the store by dispatching thunks (using dispatch()) as a side effect in our components

import { csrfFetch } from './csrf';

// define action types (strings) as constants so we can put them into actions below

// const SET_SPOTS = 'spots/SET_SPOTS';
// const SET_SPOT = 'spots/SET_SPOT'
const ADD_ONE = 'tips/ADD_ONE'
// const EDIT_ONE = 'spots/EDIT_ONE'
// const DELETE_ONE = 'spots/DELETE_ONE'


// define action creators. goal is to stamp out an action:
// {
//   type: "USER_LOGGED_IN",
//   username: "dave"
// }
// type is just used for routing. payload is what's used.

const addOneTip = tip => ({
  type: ADD_ONE,
  tip,
});



//THUNK 3
export const createTip = (formData) => async dispatch  => {
  const response = await csrfFetch('/api/tips', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  // console.log("a string ------> front end");

  if (response.ok) {
    const newTipData = await response.json();
    // this data now has a key of user with the user object as its value because i include:d it

    dispatch(addOneTip(newTipData))
    console.log("back in the front end, this is newTipData", newTipData);
    //the store is now updated because POST was successful
    // justin does everything I did up to here, but does not return. so is this necessary?
    return newTipData
  }
}

const initialState = {
  allTips: {},
  currTip: null
};



const tipsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    // type is just used for routing. payload is what's used.
    // THIS IS THE REDUX STATE, IN THE REDUX DEV TOOLS, NOT THE COMPONENT STATE
    // I am not sending this anywhere. I am changing it RIGHT HERE.
    // case SET_SPOTS:
    //   // instantiate a new empty object to copy the state into

    //   newState = Object.assign({}, state)
    //   action.spots.forEach((spot) => {
    //     newState.allSpots[spot.id] = spot
    //   })

    //   // newState.allSpots = action.spots

    //   // const newAllSpots = {};
    //   // action.spots.forEach((spot) => {
    //   //   newAllSpots[spot.id] = spot;
    //   // })
    //   return {
    //     ...state,
    //     ...newState,
    //   }
    // case SET_SPOT:
    //   // // copy state
    //   // newState = Object.assign({}, state)
    //   // create the new spot object
    //   const thisSpot = {};
    //   thisSpot[action.spot.id] = action.spot;
    //   // return the new state with the new spot object mixed in
    //   return {
    //     ...state,
    //     allSpots: {
    //       ...state.allSpots,
    //       ...thisSpot
    //     }
    //   }
    case ADD_ONE: {
      return {
        ...state,
        [action.tip.id]: action.tip,
      };
    }
    // case EDIT_ONE: {

    //   const newlyEditedSpot = {}

    //   const previousSpots = {...state.allSpots}
    //   previousSpots[action.spot.id] = action.spot;


    //   return {
    //     ...state,
    //     // sure, return the above, but we are going to overwrite the info at allSpots now
    //     allSpots: {
    //       // // first, spread out what we've already got
    //       // ...state.allSpots,
    //       // ...newlyEditedSpot
    //       ...previousSpots
    //     }
    //   }
    // }
    // case DELETE_ONE: {
    //   // copy the state into a new object
    //   newState = Object.assign({}, state)


    //   // const allSpots = {...state};
    //   // delete the spot entry in state
    //   delete newState.allSpots[action.spotId]
    //   // return the updated state
    //   return {
    //     ...newState
    //   }
    // }
    default:
      return state
  }
}

// export the reducer
export default tipsReducer;
