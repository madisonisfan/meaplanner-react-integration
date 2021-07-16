import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT:
      const comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };

    case ActionTypes.DELETE_COMMENT:
      const commentId = action.payload;
      const newComments = state.comments.filter(
        (comment) => comment._id !== commentId
      );
      return { ...state, comments: newComments };

    default:
      return state;
  }
};
