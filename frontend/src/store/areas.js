import { csrfFetch } from "./csrf";

const LOAD_AREAS = "areas/LOAD_AREAS";

const load = (areas) => ({
  type: LOAD_AREAS,
  areas,
});

export const getAreas = () => async (dispatch) => {
  const res = await csrfFetch(`/api/areas`);

  if (res.ok) {
    const areas = await res.json();
    dispatch(load(areas));
  }
};

export const searchAreas = (organization, location) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/areas/from-rec-gov/area-search", {
      method: "POST",
      body: JSON.stringify({
        organization,
        location,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const {areaArray, totalCount} = data
      dispatch(load(areaArray));
    }
  } catch (e) {
    return "error";
  }
};

const initialState = {};

const areasReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AREAS:
      const newState = {};
      action.areas.forEach((area) => {
        newState[area.id] = area;
      });
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export default areasReducer;
