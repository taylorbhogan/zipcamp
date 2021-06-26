// WE ARE IN THE FRONTEND - this is the store, inside a React.JS App run by the web browser.
// we use this module to send fetch requests to the backend, which talks to the db
// we access the store by dispatching thunks (using dispatch()) as a side effect in our components

import { useDispatch } from 'react-redux';
import { csrfFetch } from './csrf';


// define action types (strings) as constants so we can put them into actions below
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT = 'spots/SET_SPOT'
const ADD_ONE = 'spots/ADD_ONE'
const EDIT_ONE = 'spots/EDIT_ONE'
const DELETE_ONE = 'spots/DELETE_ONE'

// define action creators. goal is to stamp out an action:
// {
//   type: "USER_LOGGED_IN",
//   username: "dave"
// }
// type is just used for routing. payload is what's used.
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
const editOneSpot = spot => ({
  type: ADD_ONE,
  spot,
});
const editOneSpotNew = spot => ({
  type: EDIT_ONE,
  spot,
});
const deleteOneSpot = spotId => ({
  type: DELETE_ONE,
  spotId
})

// define thunks **********************************************************/
// it's possible to make these API calls from components and dispatch
// synchronously on success, but for consistency & reusability
// it's preferable to have the source of every change to our application state
// be an action creator. that's what thunks are for.
// THUNK 1
export const getSpots = () => async (dispatch) => {
  // this is the fetch inside of the thunk inside of Redux zooming its way off to NodeJS over HTTP
  const res = await csrfFetch('/api/spots');
  // now we've come back from the backend
  if (res.ok){
    const spots = await res.json();
    // dispatch calls the reducer, and the action creator above helps the reducer consume the object
    dispatch(setSpots(spots));
  }
}
// THUNK 2
export const getSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok){
    const spot = await res.json();
    console.log("this is the consolelog inside of getSpot TAYLOR",spot);
    if (spot){
      dispatch(setSpot(spot));
    }
  }
}

//THUNK 3
export const createSpot = (formData) => async dispatch  => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  // console.log("a string ------> front end");

  if (response.ok) {
    const newSpotData = await response.json();
    // this data now has a key of user with the user object as its value because i include:d it

    dispatch(addOneSpot(newSpotData))
    console.log("back in the front end, this is newSpotData", newSpotData);
    //the store is now updated because POST was successful
    // justin does everything I did up to here, but does not return. so is this necessary?
    return newSpotData
  }
}

// THUNK 4
export const editSpot = (newSpot) => async dispatch  => {
  // we successfully get in here thanks to the handleSubmit func in SpotEditForm.
    // console.log('inside the editSpot function');
  const response = await csrfFetch(`/api/spots/${newSpot.id}`, {
    method: 'PUT',
    body: JSON.stringify(newSpot)
  });
  if (response.ok) {
    // console.log("-----------------> we made it back to the front end");
    const newSpotData = await response.json();
    console.log("THIS IS NEWSPOTDATA",newSpotData);
    // editOneSpot works fine. trying a new one
    // dispatch(editOneSpot(newSpotData))
    // the change I'm making at 9:02 is to use editOneSpot instead....same effect. change back to new, and now let's fix it
    dispatch(editOneSpotNew(newSpotData))
    //the store is now updated because POST was successful
    return newSpotData
  }
}
// THUNK 5
export const deleteSpot = (spotId) => async dispatch  => {

    console.log('inside deleteSpot in store/spots');

    // the goal here is to travel to our API and ask it to talk to the db to delete the spot

    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
      // right now this works if I don't include a body and just use the params in the API...
      // is it even possible to send a body? (don't need it here, but for learning/later?)
      // body: JSON.stringify(spotId)
    });

    // console.log('DELETE - in deleteSpot; we have returned to the frontend from the API');

  if (response.ok) {
    // console.log("we made it back to the ~~~~~~~~~~~------> front end AND our response was OK");
    const spotDeleteSuccessMessage = await response.json();
    // console.log('spotDeleteSuccessMessage', spotDeleteSuccessMessage);
    console.log("DELETE - YES!!! inside the if response ok section of the delete Thunk");
    // 7:52: we've gotten this far. a look at the state indicates that we are not actually deleting from state with the following dispatch
    dispatch(deleteOneSpot(spotId))

    // I think all we need to do is fix the addOneSpot
    // dispatch(editOneSpot(newSpotData))
    //the store is now updated because POST was successful
    return spotDeleteSuccessMessage
  }
  return null;
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



// define an initial state -
// adding new keys here allow new nested slices of state
const initialState = {
  allSpots: {},
  currSpot: null
};

// William's example:
// from: https://github.com/WJVincent/Anvil_2.0/blob/main/app/react-app/src/store/reducers/categories.js
// const initialState = {
//   default: [],
//   user: [],
//   all: [],
// };


// The reducers that receive the actions and return updated state are pure functions of the old state and the action.
// called by .dispatch() each time an action is dispatched.
// pay attention to the params: state is from dispatch and action is the action!
const spotsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    // type is just used for routing. payload is what's used.
    // THIS IS THE REDUX STATE, IN THE REDUX DEV TOOLS, NOT THE COMPONENT STATE
    // I am not sending this anywhere. I am changing it RIGHT HERE.
    case SET_SPOTS:
      // instantiate a new empty object to copy the state into

      newState = Object.assign({}, state)
      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot
      })

      // newState.allSpots = action.spots

      // const newAllSpots = {};
      // action.spots.forEach((spot) => {
      //   newAllSpots[spot.id] = spot;
      // })
      return {
        ...state,
        ...newState,
      }
    case SET_SPOT:
      // // copy state
      // newState = Object.assign({}, state)
      // create the new spot object
      const thisSpot = {};
      thisSpot[action.spot.id] = action.spot;
      // return the new state with the new spot object mixed in
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          ...thisSpot
        }
      }
    case ADD_ONE: {
      return {
        ...state,
        [action.spot.id]: action.spot,
      };
    }
    case EDIT_ONE: {
      // newState = Object.assign({}, state)
      // newState.allSpots[action.spot.id]: action.spot
      const newlyEditedSpot = {}

      const previousSpots = {...state.allSpots}
      previousSpots[action.spot.id] = action.spot;


      return {
        ...state,
        // sure, return the above, but we are going to overwrite the info at allSpots now
        allSpots: {
          // // first, spread out what we've already got
          // ...state.allSpots,
          // ...newlyEditedSpot
          ...previousSpots
        }
      }
    }
    case DELETE_ONE: {
      // copy the state into a new object
      newState = Object.assign({}, state)


      // const allSpots = {...state};
      // delete the spot entry in state
      delete newState.allSpots[action.spotId]
      // return the updated state
      return {
        ...newState
      }
    }
    // case SET_SPOTS:
    //   // instantiate a new empty object to copy the state into
    //   const allSpots = {};
    //   action.spots.forEach((spot) => {
    //     allSpots[spot.id] = spot;
    //   })
    //   return {
    //     ...state,
    //     ...allSpots,
    //   }



    // case EDIT_ONE: {
    //   return {
    //     ...sta
    //   }
    // }
    // case ADD_ONE:
    //   if (!state[action.spot.id]) {
    //     const newState = {
    //       ...state,
    //       [action.spot.id]: action.spot
    //     }
    //     return newState;
    //   }
    //   return {
    //     ...state,
    //     [action.spot.id]: {
    //       ...state[action.state.id],
    //       ...action.state
    //     }
    //   }

    default:
      return state
  }
}

// export the reducer
export default spotsReducer;
