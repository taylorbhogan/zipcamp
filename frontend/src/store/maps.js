import { csrfFetch } from "./csrf";

const LOAD_API_KEY = "maps/LOAD_API_KEY";

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

// Middleware // Validation:
// We're using a POST route because this gives you the option to send a public key to the backend to encrypt the API key so that it doesn't get taken in transit from the backend to the frontend. For our example, we won't go through all of that.

export const getKey = () => async (dispatch) => {
  const res = await csrfFetch("/api/maps/key", {
    method: "POST",
  });
  const data = await res.json();
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.payload };
    default:
      return state;
  }
};

export default mapsReducer;
