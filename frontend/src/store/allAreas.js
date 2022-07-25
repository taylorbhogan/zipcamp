import { csrfFetch } from "./csrf";

const LOAD_ALL_AREAS = "allAreas/LOAD_ALL_AREAS";

const loadAll = (areas, length) => ({
  type: LOAD_ALL_AREAS,
  areas,
  length,
});

export const getAllAreas = () => async (dispatch) => {
  const res = await csrfFetch(`/api/areas`);

  if (res.ok) {
    const areas = await res.json();
    dispatch(loadAll(areas));
  }
};

const initialState = {};

const allAreasReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_AREAS:
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

export default allAreasReducer;
