import { csrfFetch } from "./csrf";

const LOAD_STATES = "states/LOAD_STATES";

const setStates = (states) => ({
  type: LOAD_STATES,
  states,
});

export const getUsStates = () => async (dispatch) => {
  const res = await csrfFetch(`/api/states`);

  if (res.ok) {
    const states = await res.json();
    dispatch(setStates(states));
    return states;
  }
};

const initialState = {};

const statesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATES:
      const allStates = {};
      action.states.forEach((state) => {
        allStates[state.id] = state;
      });
      return {
        ...state,
        ...allStates,
      };
    default:
      return state;
  }
};

export default statesReducer;
