import * as ActionTypes from "./ActionTypes";
import { POSTS } from "../shared/posts";
import { MEALTYPES } from "../shared/mealTypes";
import { RECIPES } from "../shared/recipes";
import { USERINFO } from "../shared/userInfo";
import { USERMEALPLAN } from "../shared/mealplan";
import { baseUrl } from "../shared/baseUrl";

/*
export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading());
  setTimeout(() => {
    dispatch(addPosts(POSTS));
    //console.log(`POSTS from act creators:${POSTS}`);
  }, 2000);
};*/

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading());

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites", {
    headers: {
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => dispatch(addFavorites(favorites)))
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const postFavorite = (recipeId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites/" + recipeId, {
    method: "POST",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => {
      console.log("Favorite Added", favorites);
      dispatch(addFavorites(favorites));
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (recipeId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites/" + recipeId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => {
      console.log("Favorite Deleted", favorites);
      dispatch(addFavorites(favorites));
      //dispatch(removeFavorite)
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING,
});

export const favoritesFailed = (errMess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errMess,
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites,
});

export const fetchLikes = () => (dispatch) => {
  return fetch(baseUrl + "likes")
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
    .then((likes) => dispatch(addLikes(likes)))
    .catch((error) => dispatch(likesFailed(error.message)));
};

export const postLike = (postId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return (
    fetch(baseUrl + "likes/" + postId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            const error = new Error(
              `Error ${response.status}: ${response.statusText}`
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((like) => dispatch(addLike(like)))
      //.then(() => location.reload())
      .catch((error) => {
        console.log("post like", error.message);
        alert("Your like could not be posted\nError: " + error.message);
      })
  );
};

export const deleteLike = (postId) => (dispatch) => {
  console.log("post to unlike id", postId);
  console.log("unliking");

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "likes/" + postId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((like) => {
      console.log("remove like action c", like);
      //console.log("Like Deleted", likes);
      // dispatch(addLikes(likes));
      dispatch(removeLike(like));
    })
    .catch((error) => dispatch(likesFailed(error.message)));
};

export const addLike = (like) => ({
  type: ActionTypes.ADD_LIKE,
  payload: like,
});
export const removeLike = (like) => ({
  type: ActionTypes.DELETE_LIKE,
  payload: like,
});

export const addLikes = (likes) => ({
  type: ActionTypes.ADD_LIKES,
  payload: likes,
});

export const likesFailed = (errMess) => ({
  type: ActionTypes.LIKES_FAILED,
  payload: errMess,
});

export const fetchPosts = () => (dispatch) => {
  dispatch(recipesLoading());

  return fetch(baseUrl + "posts")
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
    .then((posts) => dispatch(addPosts(posts)))
    .catch((error) => dispatch(postsFailed(error.message)));
};

export const updatePost = (postId, postContent) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return (
    fetch(baseUrl + "posts/" + postId, {
      method: "PUT",
      // body: JSON.stringify(updatedPost),
      body: JSON.stringify(postContent),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            const error = new Error(
              `Error ${response.status}: ${response.statusText}`
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      //.then((response) => dispatch(addPost(response)))
      .then(() => location.reload())
      .catch((error) => {
        console.log("post err", error.message);
        alert("Your post could not be posted\nError: " + error.message);
      })
  );
};

export const deletePost = (postId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "posts/" + postId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((post) => {
      console.log("Post Deleted", post);
      //dispatch(addPosts(posts));
      dispatch(removePost(post._id));
    })
    .catch((error) => dispatch(postsFailed(error.message)));
};

/*export const removePost = (postId) => {
  alert(postId);
};*/

export const removePost = (postId) => ({
  type: ActionTypes.DELETE_POST,
  payload: postId,
});

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
    postType,
    postContent,
  };

  newPost.postDate = new Date().toLocaleDateString();

  console.log("Post", newPost);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addPost(response)))
    .then(() => location.reload())
    .catch((error) => {
      console.log("post post", error.message);
      alert("Your post could not be posted\nError: " + error.message);
    });
};

export const addPost = (post) => ({
  type: ActionTypes.ADD_POST,
  payload: post,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
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
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const postComment = (postId, commentContent) => (dispatch) => {
  const newComment = {
    post: postId,
    commentContent,
  };
  //newComment.commentDate = new Date().toISOString();
  newComment.commentDate = new Date().toLocaleDateString();

  console.log("Comment ", newComment);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((comment) => dispatch(addComment(comment)))
    .catch((error) => {
      console.log("post comment", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const updateComment = (commentId, commentContent) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "comments/" + commentId, {
    method: "PUT",
    body: JSON.stringify(commentContent),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())

    .then(() => location.reload())
    .catch((error) => {
      console.log("comment err", error.message);
      alert("Your comment could not be updated\nError: " + error.message);
    });
};

export const removeComment = (commentId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  console.log("comment id to remove", commentId);

  return fetch(baseUrl + "comments/" + commentId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((commentDeleted) => {
      console.log("Comment Deleted", commentDeleted);
      dispatch(deleteComment(commentDeleted._id));
      //dispatch(addFavorites(favorites));
    })
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const deleteComment = (commentId) => ({
  type: ActionTypes.DELETE_COMMENT,
  payload: commentId,
});

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
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
  recipeName,
  recipeDescription,
  mealType,
  servings,
  calories,
  cooktime,
  preptime,
  ingredients,
  instructions
) => (dispatch) => {
  console.log(mealType);
  // let submittedMealType

  const newRecipe = {
    recipeName,
    recipeDescription,
    mealType,
    servings,
    calories,
    cooktime,
    preptime,
    ingredients,
    instructions,
  };
  console.log(new Date().toISOString().date);
  newRecipe.recipeDate = new Date().toISOString();
  newRecipe.imageUrl = "images/food2.jpg";

  console.log("new recipe ", newRecipe);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "recipes", {
    method: "POST",
    body: JSON.stringify(newRecipe),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
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
    .then((recipe) => dispatch(addRecipe(recipe)))
    .catch((error) => {
      //console.log("add recipe", error.message);
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

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        //dispatch(fetchFavorites());
        dispatch(receiveLogin(response));
      } else {
        const error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  // dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
};
