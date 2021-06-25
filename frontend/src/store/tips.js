// WE ARE IN THE FRONTEND - this is the store, inside a React.JS App run by the web browser.
// we use this module to send fetch requests to the backend, which talks to the db
// we access the store by dispatching thunks (using dispatch()) as a side effect in our components

import { csrfFetch } from './csrf';

// define action types (strings) as constants so we can put them into actions below

const SET_TIPS = 'spots/SET_TIPS';
// const SET_SPOT = 'spots/SET_SPOT'
const ADD_ONE = 'tips/ADD_ONE'
const EDIT_ONE = 'tips/EDIT_ONE'
const DELETE_ONE = 'tips/DELETE_ONE'


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

const setTips = (tips) => ({
  type: SET_TIPS,
  tips,
})

const editOneTipNew = tip => ({
  type: EDIT_ONE,
  tip,
});
const deleteOneTip = tipId => ({
  type: DELETE_ONE,
  tipId
})

//THUNK 2
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getTips = () => async (dispatch) => {
  // this is the fetch inside of the thunk inside of Redux zooming its way off to NodeJS over HTTP
  const res = await csrfFetch('/api/tips');
  // now we've come back from the backend
  if (res.ok){
    const tips = await res.json();
    // dispatch calls the reducer, and the action creator above helps the reducer consume the object
    dispatch(setTips(tips));
  }
}

//THUNK 1
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

// THUNK 3
export const editTip = (newTip) => async dispatch  => {
  // we successfully get in here thanks to the handleSubmit func in SpotEditForm.
    // console.log('inside the editSpot function');
  const response = await csrfFetch(`/api/tips/${newTip.id}`, {
    method: 'PUT',
    body: JSON.stringify(newTip)
  });
  if (response.ok) {
    // console.log("-----------------> we made it back to the front end");
    const newTipData = await response.json();
    console.log("THIS IS NEWSPOTDATA",newTipData);
    // editOneSpot works fine. trying a new one
    // dispatch(editOneSpot(newTipData))
    // the change I'm making at 9:02 is to use editOneSpot instead....same effect. change back to new, and now let's fix it
    dispatch(editOneTipNew(newTipData))
    //the store is now updated because POST was successful
    return newTipData
  }
}

export const deleteTip = (tipId) => async dispatch  => {

  console.log('DELETE - at the first line of deleteSpot');

  // the goal here is to travel to our API and ask it to talk to the db to delete the spot

  const response = await csrfFetch(`/api/tips/${tipId}`, {
    method: 'DELETE',
    // right now this works if I don't include a body and just use the params in the API...
    // is it even possible to send a body? (don't need it here, but for learning/later?)
    // body: JSON.stringify(tipId)
  });

  console.log('DELETE - in deleteSpot; we have returned to the frontend from the API');

if (response.ok) {
  // console.log("we made it back to the ~~~~~~~~~~~------> front end AND our response was OK");
  const tipDeleteSuccessMessage = await response.json();
  // console.log('spotDeleteSuccessMessage', spotDeleteSuccessMessage);
  console.log("DELETE - YES!!! inside the if response ok section of the delete Thunk");
  // 7:52: we've gotten this far. a look at the state indicates that we are not actually deleting from state with the following dispatch
  dispatch(deleteOneTip(tipId))

  // I think all we need to do is fix the addOneSpot
  // dispatch(editOneSpot(newSpotData))
  //the store is now updated because POST was successful
  return tipDeleteSuccessMessage
}
return null;
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
    case SET_TIPS:
      // instantiate a new empty object to copy the state into

      newState = Object.assign({}, state)
      action.tips.forEach((tip) => {
        newState.allTips[tip.id] = tip
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
    case EDIT_ONE: {
      const previousTips = {...state.allTips}
      previousTips[action.tip.id] = action.tip;
      return {
        ...state,
        allTips: {
          ...previousTips
        }
      }
    }
    case ADD_ONE: {
      const thisTip = {}
      thisTip[action.tip.id] = action.tip;
      return {
        ...state,
        allTips: {
          ...state.allTips,
          ...thisTip
        }
      };
    }
    case DELETE_ONE: {
      // copy the state into a new object
      newState = Object.assign({}, state)


      // const allSpots = {...state};
      // delete the spot entry in state
      delete newState.allTips[action.tipId]
      // return the updated state
      return {
        ...newState
      }
    }
    // ////////////////////////////////////////////////////////////////
    // case ADD_ONE: {
      //   return {
        //     ...state,
        //     [action.tip.id]: action.tip,
        //   };
        // }
        // ////////////////////////////////////////////////////////////////
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
