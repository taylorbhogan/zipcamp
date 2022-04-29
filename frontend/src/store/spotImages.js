import { csrfFetch } from "./csrf";

const ADD_ONE = "spotImages/ADD_ONE"

const addOneSpotImage = spotImage => ({
  type: ADD_ONE,
  spotImage
})


export const createSpotImage = spotImageInfo => async (dispatch) => {
  const { image, spotId } = spotImageInfo;
  const formData = new FormData();
  formData.append("spotId",spotId)
  formData.append("image",image)

  const res = await csrfFetch(`api/images/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })

  const data = await res.json()
  dispatch(addOneSpotImage(data.spotImage))
}

const initialState = {
  allSpotImages: {},
  currSpotImage: null,
}

const spotImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE:
      return {...state, currSpotImage: action.spotImage};
    default:
      return state;
  }
}

export default spotImagesReducer;
