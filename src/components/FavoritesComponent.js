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
} from "reactstrap";
import { LocalForm, Control } from "react-redux-form"; // Errors
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function Favorites({
  favoritesLoading,
  favoritesErrMess,
  favorites,
  auth,
  deleteFavorite,
}) {
  return (
    <React.Fragment>
      <PageTitleComponent title="Favorites" />
      <div className="container-fluid">
        <div className="row recipe-card-row">
          <RenderRecipeCard
            recipes={favorites}
            isLoading={favoritesLoading}
            ErrMess={favoritesErrMess}
            deleteFavorite={deleteFavorite}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

function RenderRecipeCard({
  favoritesLoading,
  favoritesErrMess,
  recipes,
  deleteFavorite,
}) {
  //alert(`recipes: ${recipes.map((recipe) => recipe.name)}`);
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
                    <Button onClick={() => deleteFavorite(recipe._id)}>
                      Remove Fav
                    </Button>
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
                      <Button>Remove Fav</Button>
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

export default Favorites;
