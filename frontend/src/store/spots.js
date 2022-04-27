import { csrfFetch } from "./csrf";

const SET_SPOTS = "spots/SET_SPOTS";
const SET_SPOT = "spots/SET_SPOT";
const ADD_ONE = "spots/ADD_ONE";
const EDIT_ONE = "spots/EDIT_ONE";
const DELETE_ONE = "spots/DELETE_ONE";

const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

export const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
});

const addOneSpot = (spot) => ({
  type: ADD_ONE,
  spot,
});

const editOneSpotNew = (spot) => ({
  type: EDIT_ONE,
  spot,
});

const deleteOneSpot = (spotId) => ({
  type: DELETE_ONE,
  spotId,
});

export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(setSpots(spots));
    return spots;
  }
  return "An unexpected error occurred while fetching your spots from our servers";
};

export const getSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spot = await res.json();
    if (spot) {
      dispatch(setSpot(spot));
    }
  }
};

export const createSpot = (formData) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const newSpotData = await response.json();

    dispatch(addOneSpot(newSpotData));
    return newSpotData;
  }
};

export const editSpot = (newSpot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${newSpot.id}`, {
    method: "PUT",
    body: JSON.stringify(newSpot),
  });
  if (response.ok) {
    const newSpotData = await response.json();

    dispatch(editOneSpotNew(newSpotData));
    return newSpotData;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const spotDeleteSuccessMessage = await response.json();
    dispatch(deleteOneSpot(spotId));
    return spotDeleteSuccessMessage;
  }
  return null;
};

const initialState = {
  allSpots: {},
  currSpot: null,
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SPOTS:
      newState = Object.assign({}, state);
      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return {
        ...state,
        ...newState,
      };
    case SET_SPOT:
      const thisSpot = {};
      thisSpot[action.spot.id] = action.spot;
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          ...thisSpot,
        },
      };
    case ADD_ONE: {
      return {
        ...state,
        [action.spot.id]: action.spot,
      };
    }
    case EDIT_ONE: {
      const previousSpots = { ...state.allSpots };
      previousSpots[action.spot.id] = action.spot;
      return {
        ...state,
        allSpots: {
          ...previousSpots,
        },
      };
    }
    case DELETE_ONE: {
      newState = Object.assign({}, state);
      delete newState.allSpots[action.spotId];
      return {
        ...newState,
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
