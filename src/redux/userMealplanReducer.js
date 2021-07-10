import * as ActionTypes from "./ActionTypes";

export const UserMealplan = (
  state = { errMess: null, isLoading: true, userMealplan: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USER_MEALPLAN:
      return {
        ...state,
        errMess: null,
        isLoading: false,
        userMealplan: action.payload,
      };
    default:
      return state;
  }
};
