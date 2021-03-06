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

export const getUserSpots = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/users/${userId}`);
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

export const createSpotImage = (spotImageInfo) => async (dispatch) => {
  const { image, spotId } = spotImageInfo;
  const formData = new FormData();
  formData.append("spotId", spotId);
  formData.append("image", image);

  const res = await csrfFetch(`/api/images/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setSpot(data.spot));
};

export const deleteSpotImage = (spotImageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/spots/${spotImageId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  dispatch(setSpot(data.spot));
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

export const searchSpots = (searchTerm) => async (dispatch) => {
  if (searchTerm === "") {
    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const allSpots = await res.json();
      dispatch(setSpots(allSpots));
      return allSpots;
    }
  }
  const res = await csrfFetch(`api/spots/search/${searchTerm}`);

  if (res.ok) {
    const filteredSpots = await res.json();
    dispatch(setSpots(filteredSpots));
    return filteredSpots.length;
  }

  return [searchTerm];
};

const spotsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SPOTS:
      return [...action.spots];
    case SET_SPOT:
      return [action.spot];
    case ADD_ONE: {
      return [action.spot];
    }
    case EDIT_ONE: {
      return [action.spot];
    }
    case DELETE_ONE: {
      return [];
    }
    default:
      return state;
  }
};

export default spotsReducer;
