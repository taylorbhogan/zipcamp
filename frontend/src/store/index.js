import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import areasReducer from "./areas";
import allAreasReducer from "./allAreas";
import sessionReducer from "./session";
import spotsReducer from "./spots";
import statesReducer from "./usStates";
import tipsReducer from "./tips";
import mapsReducer from "./maps";
import spotImagesReducer from "./spotImages";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  areas: areasReducer,
  allAreas: allAreasReducer,
  states: statesReducer,
  tips: tipsReducer,
  maps: mapsReducer,
  spotImages: spotImagesReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
