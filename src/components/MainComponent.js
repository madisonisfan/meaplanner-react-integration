import React, { Component } from "react";
import Home from "./HomeComponent";
import MainHeader from "./HeaderComponent";
import Footer from "./FooterComponent";
import MainBlogPage from "./BlogComponent";
import YourPage from "./YourPageComponent";
import MainRecipePage from "./RecipePageComponent";
import MainMealplanPage from "./MealPlanComponent";
import FavoritesComponent from "./FavoritesComponent";
import {
  fetchPosts,
  postNewPost,
  deletePost,
  updatePost,
  fetchMealtypes,
  fetchRecipes,
  fetchUserInfo,
  fetchFavorites,
  deleteFavorite,
  postRecipe,
  fetchUserMealplan,
  loginUser,
  logoutUser,
  postFavorite,
} from "../redux/ActionCreators";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    mealtypes: state.mealtypes,
    posts: state.posts,
    userInfo: state.userInfo,
    userMealplan: state.userMealplan,
    auth: state.auth,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  fetchPosts: () => fetchPosts(),
  resetPostForm: () => actions.reset("postForm"),
  addPost: (postType, postContent) => postNewPost(postType, postContent),
  deletePost: (postId) => deletePost(postId),
  updatePost: (postId, postContent) => updatePost(postId, postContent),
  fetchMealtypes: () => fetchMealtypes(),
  fetchFavorites: () => fetchFavorites(),
  deleteFavorite: (recipeId) => deleteFavorite(recipeId),
  fetchRecipes: () => fetchRecipes(),
  postRecipe: (
    name,
    description,
    recipeType,
    servings,
    calories,
    cooktime,
    preptime,
    ingredients,
    instructions
  ) =>
    postRecipe(
      name,
      description,
      recipeType,
      servings,
      calories,
      cooktime,
      preptime,
      ingredients,
      instructions
    ),
  fetchUserInfo: () => fetchUserInfo(),
  fetchUserMealplan: () => fetchUserMealplan(),
  loginUser: (creds) => loginUser(creds),
  logoutUser: () => logoutUser(),
  postFavorite: (recipeId) => postFavorite(recipeId),
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchMealtypes();
    this.props.fetchRecipes();
    this.props.fetchUserInfo();
    this.props.fetchUserMealplan();
    this.props.fetchFavorites();
  }

  render() {
    const RecipeWithMealType = ({ match }) => {
      let type = match.params.mealType;
      console.log("1st type: ", type);
      const selectedTypeTitle = this.props.mealtypes.mealtypes
        .filter((typeObj) => typeObj.mealType === type)
        .map((typeObj) => typeObj.title);

      if (type === "LunchDinner") {
        type = "Lunch/Dinner";
      }

      console.log("2nd type: ", type);

      if (type === "allRecipes") {
        return (
          <MainRecipePage
            favorites={this.props.favorites.favorites.map(
              (favorite) => favorite._id
            )}
            postFavorite={this.props.postFavorite}
            auth={this.props.auth}
            selectedType="All Recipes"
            mealTypes={this.props.mealtypes.mealtypes}
            recipes={this.props.recipes.recipes}
            postRecipe={this.props.postRecipe}
            deleteFavorite={this.props.deleteFavorite}
          />
        );
      } else {
        return (
          <MainRecipePage
            favorites={this.props.favorites.favorites}
            postFavorite={this.props.postFavorite}
            auth={this.props.auth}
            selectedType={selectedTypeTitle}
            mealTypes={this.props.mealtypes.mealtypes}
            recipes={this.props.recipes.recipes.filter(
              (recipe) => recipe.mealType === type
            )}
            postRecipe={this.props.postRecipe}
            deleteFavorite={this.props.deleteFavorite}
          />
        );
      }
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    return (
      <React.Fragment>
        <MainHeader
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/recipes/:mealType" component={RecipeWithMealType} />
          <Route
            path="/blog"
            render={() => (
              <MainBlogPage
                deletePost={this.props.deletePost}
                updatePost={this.props.updatePost}
                auth={this.props.auth}
                posts={this.props.posts.posts}
                postsLoading={this.props.posts.isLoading}
                postsErrMess={this.props.posts.errMess}
                resetPostForm={this.props.resetPostForm}
                addPost={this.props.addPost}
              />
            )}
          />
          <Route
            path="/yourpage"
            render={() => <YourPage userInfo={this.props.userInfo.userInfo} />}
          />
          <Route
            path="/mealplan"
            render={() => (
              <MainMealplanPage userMealplan={this.props.userMealplan} />
            )}
          />
          <Route
            path="/favorites"
            render={() => (
              <FavoritesComponent
                deleteFavorite={this.props.deleteFavorite}
                favorites={this.props.favorites.favorites}
                favoritesLoading={this.props.favorites.isLoading}
                favoritesErrMess={this.props.favorites.errMess}
                auth={this.props.auth}
              />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
