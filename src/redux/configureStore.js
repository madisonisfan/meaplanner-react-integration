import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Recipes } from "./recipesReducer";
import { Posts } from "./postsReducer";
import { Mealtypes } from "./mealtypesReducer";
import { UserInfo } from "./userinfoReducer";
import { InitialPostForm } from "./forms";
import { UserMealplan } from "./userMealplanReducer";
import { Auth } from "./auth";

const rootReducer = combineReducers({
  recipes: Recipes,
  posts: Posts,
  mealtypes: Mealtypes,
  userInfo: UserInfo,
  userMealplan: UserMealplan,
  auth: Auth,
  ...createForms({
    postForm: InitialPostForm,
  }),
});

export const ConfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return store;
};
