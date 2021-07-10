import * as ActionTypes from "./ActionTypes";

export const UserInfo = (
  state = {
    isLoading: true,
    errMess: null,
    userInfo: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USERINFO:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
