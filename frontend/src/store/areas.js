import { csrfFetch } from "./csrf";

const LOAD_AREAS = "areas/LOAD_AREAS";

const load = (areas, length) => ({
  type: LOAD_AREAS,
  areas,
  length
});

export const getAreas = () => async (dispatch) => {
  const res = await csrfFetch(`/api/areas`);

  if (res.ok) {
    const areas = await res.json();
    dispatch(load(areas));
  }
};

export const searchAreas = (organization, location, resultsPerPage, offset) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/areas/from-rec-gov/area-search", {
      method: "POST",
      body: JSON.stringify({
        organization,
        location,
        resultsPerPage,
        offset
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const {areaArray, totalCount} = data
      // console.log("areaArray",areaArray);
      // console.log("totalCount",totalCount);
      dispatch(load(areaArray, totalCount));
    }
  } catch (e) {
    return "error";
  }
};

const initialState = {searchResults: {}, searchResultsLength: 0};

const areasReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AREAS:
      const newState = {searchResults: {}, searchResultsLength: 0};
      action.areas.forEach((area) => {
        newState.searchResults[area.id] = area;
      });
      newState.searchResultsLength = action.length;
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export default areasReducer;
