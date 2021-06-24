import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import areasReducer from './areas';
import sessionReducer from './session';
import spotsReducer from './spots'
import statesReducer from './usStates';

// each of the keys in here are set on the state obj and are how I'll key into it
// these are the slices of state
// redux's state is just an object: right now it just has 4 categories
// inside of those we can do other nestings if we choose to
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  areas: areasReducer,
  states: statesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// this function will be used by index.js to attach the Redux store to the React application.
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
