import * as ActionTypes from "./ActionTypes";

export const Mealtypes = (state = { mealtypes: [], errMess: null }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MEALTYPES:
      return { ...state, mealtypes: action.payload, errMess: null };
    default:
      return state;
  }
};
