import React, { Component } from "react";
import PageTitleComponent from "./PageTitleComponent";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Media,
  Row,
  Col,
} from "reactstrap"; // Row, Body,
//import { Media, MediaBody } from "react-media";
import { Link } from "react-router-dom";
//import { render } from "react-dom";
import { LocalForm, Control } from "react-redux-form"; //Errors
import { baseUrl } from "../shared/baseUrl";

function MyRecipes({ recipes, auth }) {
  console.log(auth);
  return (
    <React.Fragment>
      <PageTitleComponent title={`My Recipes`} />

      <div className="container-fluid">
        <div className="row recipe-card-row">
          <RenderRecipeCard recipes={recipes.recipes} auth={auth} />
        </div>
      </div>
    </React.Fragment>
  );
}

function RenderRecipeCard({
  recipes,
  postFavorite,
  auth,
  favorites,
  deleteFavorite,
}) {
  //alert(`recipes: ${recipes.map((recipe) => recipe.name)}`);
  console.log("auth", auth.user.username);
  if (recipes) {
    return (
      <React.Fragment>
        {recipes.map((recipe) => {
          return (
            <React.Fragment key={recipe._id}>
              <div className="col-4 col-lg-3 d-none d-md-block">
                <Card className="recipe-card mx-auto">
                  <img
                    class="card-img-top recipe-img"
                    src={baseUrl + recipe.imageUrl}
                  />
                  <CardBody>
                    <Link style={{ color: "black" }}>
                      <h5>{recipe.recipeName}</h5>
                    </Link>
                    <p>{recipe.recipeDescription}</p>
                  </CardBody>
                </Card>
              </div>

              <div className="recipe-container-sm  mx-auto d-block d-md-none">
                <Col xs={12} className="recipe-box-sm">
                  <Media>
                    <Media left>
                      <img
                        className="d-flex recipe-img-sm"
                        src={baseUrl + recipe.imageUrl}
                      />
                    </Media>

                    <Media body className="recipe-sm-body">
                      <Link style={{ color: "black" }}>
                        <h5>{recipe.recipeName}</h5>
                      </Link>
                      <p>{recipe.recipeDescription}</p>
                    </Media>
                  </Media>
                </Col>
              </div>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  } else {
    return <div className="col">Problem with object</div>;
  }
}

export default MyRecipes;
