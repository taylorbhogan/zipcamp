import { csrfFetch } from "./csrf";

const SET_TIPS = "spots/SET_TIPS";
const ADD_ONE = "tips/ADD_ONE";
const EDIT_ONE = "tips/EDIT_ONE";
const DELETE_ONE = "tips/DELETE_ONE";

const addOneTip = (tip) => ({
  type: ADD_ONE,
  tip,
});

const setTips = (tips) => ({
  type: SET_TIPS,
  tips,
});

const editOneTipNew = (tip) => ({
  type: EDIT_ONE,
  tip,
});

const deleteOneTip = (tipId) => ({
  type: DELETE_ONE,
  tipId,
});

export const getTips = () => async (dispatch) => {
  const res = await csrfFetch("/api/tips");
  if (res.ok) {
    const tips = await res.json();
    dispatch(setTips(tips));
  }
};

export const createTip = (formData) => async (dispatch) => {
  const response = await csrfFetch("/api/tips", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const newTipData = await response.json();

    dispatch(addOneTip(newTipData));
    return newTipData;
  }
};

export const editTip = (newTip) => async (dispatch) => {
  const response = await csrfFetch(`/api/tips/${newTip.id}`, {
    method: "PUT",
    body: JSON.stringify(newTip),
  });
  if (response.ok) {
    const newTipData = await response.json();
    dispatch(editOneTipNew(newTipData));
    return newTipData;
  }
};

export const deleteTip = (tipId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tips/${tipId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const tipDeleteSuccessMessage = await response.json();
    dispatch(deleteOneTip(tipId));

    return tipDeleteSuccessMessage;
  }
  return null;
};

const initialState = {
  allTips: {},
  currTip: null,
};

const tipsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_TIPS:
      newState = Object.assign({}, state);
      action.tips.forEach((tip) => {
        newState.allTips[tip.id] = tip;
      });
      return {
        ...state,
        ...newState,
      };
    case EDIT_ONE: {
      const previousTips = { ...state.allTips };
      previousTips[action.tip.id] = action.tip;
      return {
        ...state,
        allTips: {
          ...previousTips,
        },
      };
    }
    case ADD_ONE: {
      const thisTip = {};
      thisTip[action.tip.id] = action.tip;
      return {
        ...state,
        allTips: {
          ...state.allTips,
          ...thisTip,
        },
      };
    }
    case DELETE_ONE: {
      newState = Object.assign({}, state);
      delete newState.allTips[action.tipId];
      return {
        ...newState,
      };
    }

    default:
      return state;
  }
};

export default tipsReducer;
