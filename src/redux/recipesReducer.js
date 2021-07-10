import * as ActionTypes from "./ActionTypes";

export const Recipes = (
  state = { isLoading: true, errMess: null, recipes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_RECIPES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        recipes: action.payload,
      };
    case ActionTypes.ADD_RECIPE:
      const recipe = action.payload;
      return { ...state, recipes: state.recipes.concat(recipe) };
    case ActionTypes.RECIPES_FAILED:
      return { ...state, errMess: action.payload, isLoading: false };
    case ActionTypes.RECIPES_LOADING:
      return { ...state, errMess: null, isLoading: true, recipes: [] };
    default:
      return state;
  }
};
