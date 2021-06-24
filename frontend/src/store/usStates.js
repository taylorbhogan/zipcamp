import { csrfFetch } from './csrf';


// Front-to-back: step 3
// Define action types as constants
const LOAD_STATES = 'states/LOAD_STATES'

// Front-to-back: step 2
// define action creators
const load = (states) => ({
  type: LOAD_STATES,
  states
})

// Front-to-back: step 1
// define thunk creators
export const getUsStates = () => async dispatch => {
  // TODO: complete the api call?
  const res = await csrfFetch(`/api/states`);

  if (res.ok) {
    const states = await res.json();
    // rename the load function?
    dispatch(load(states));
  }
}


// Front-to-back: step 4
// define an initial state
const initialState = {};

// const initialState = {
  // I want to use this for the sortList function below, but including it here throws a React keys error
  // list: []
// };


// The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.
// const sortList = (list) => {
//   return list.sort((pokemonA, pokemonB) => {
//     return pokemonA.no - pokemonB.no;
//   }).map((pokemon) => pokemon.id);
// };

// Front-to-back: step 5
// define a reducer
const statesReducer = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_STATES:
      const allStates = {};
      action.states.forEach((state) => {
        allStates[state.id] = state;
      })
      return {
        ...state,
        ...allStates
      }
    default:
      return state
  }
}


// export the reducer
export default statesReducer;
