import * as ActionTypes from "./ActionTypes";
import { POSTS } from "../shared/posts";
import { MEALTYPES } from "../shared/mealTypes";
import { RECIPES } from "../shared/recipes";
import { USERINFO } from "../shared/userInfo";
import { USERMEALPLAN } from "../shared/mealplan";
import { baseUrl } from "../shared/baseUrl";

export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading());

  setTimeout(() => {
    dispatch(addPosts(POSTS));
    //console.log(`POSTS from act creators:${POSTS}`);
  }, 2000);
};

export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts,
});

export const postsFailed = (errMess) => ({
  type: ActionTypes.POSTS_FAILED,
  payload: errMess,
});

export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING,
});

export const postNewPost = (postType, postContent) => (dispatch) => {
  const newPost = {
    postType: postType,
    postContent: postContent,
  };
  newPost.date = new Date().toISOString();
  newPost.author = "random author";

  dispatch(addPost(newPost));
};

export const addPost = (post) => ({
  type: ActionTypes.ADD_POST,
  payload: post,
});

export const fetchMealtypes = () => (dispatch) => {
  dispatch(addMealtypes(MEALTYPES));
};

export const addMealtypes = (mealtypes) => ({
  type: ActionTypes.ADD_MEALTYPES,
  payload: mealtypes,
});

export const fetchRecipes = () => (dispatch) => {
  dispatch(recipesLoading());

  return fetch(baseUrl + "recipes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error: ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((recipes) => dispatch(addRecipes(recipes)))
    .catch((error) => dispatch(recipesFailed(error.message)));
};

export const recipesFailed = (errMess) => ({
  type: ActionTypes.RECIPES_FAILED,
  payload: errMess,
});

export const recipesLoading = () => ({
  type: ActionTypes.RECIPES_LOADING,
});

export const addRecipes = (recipes) => ({
  type: ActionTypes.ADD_RECIPES,
  payload: recipes,
});

export const postRecipe = (
  name,
  description,
  recipeType,
  servings,
  calories,
  cooktime,
  preptime,
  ingredients,
  instructions
) => (dispatch) => {
  //alert("post recipe");

  const newRecipe = {
    name,
    description,
    recipeType,
    servings,
    calories,
    cooktime,
    preptime,
    ingredients,
    instructions,
  };

  newRecipe.date = new Date().toISOString().date;
  newRecipe.image = "images/food2.jpg";

  return fetch(baseUrl + "recipes", {
    method: "POST",
    body: JSON.stringify(newRecipe),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      }
    })
    .then((response) => response.json())
    .then((repsonse) => dispatch(addRecipe(repsonse)))
    .catch((error) => {
      console.log("add recipe", error.message);
      alert("Your recipe could not be posted\nError:" + error.message);
    });
};

export const addRecipe = (recipe) => ({
  type: ActionTypes.ADD_RECIPE,
  payload: recipe,
});

export const fetchUserInfo = () => (dispatch) => {
  dispatch(addUserInfo(USERINFO));
};

export const addUserInfo = (userinfo) => ({
  type: ActionTypes.ADD_USERINFO,
  payload: userinfo,
});

export const fetchUserMealplan = () => (dispatch) => {
  dispatch(addUserMealplan(USERMEALPLAN));
};

export const addUserMealplan = (mealplan) => ({
  type: ActionTypes.ADD_USER_MEALPLAN,
  payload: mealplan,
});
