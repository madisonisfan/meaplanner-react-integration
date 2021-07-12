import * as ActionTypes from "./ActionTypes";

export const Likes = (state = { errMess: null, likes: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LIKES:
      return { ...state, errMess: null, likes: action.payload };

    case ActionTypes.LIKES_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_LIKE:
      const like = action.payload;
      return { ...state, likes: state.likes.concat(like) };

    default:
      return state;
  }
};
