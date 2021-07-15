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

function MainRecipePage({
  selectedType,
  mealTypes,
  recipes,
  postRecipe,
  auth,
  postFavorite,
  favorites,
  deleteFavorite,
}) {
  console.log(`selected Type ${selectedType}`);

  return (
    <React.Fragment>
      <PageTitleComponent title={`Recipe: ${selectedType}`} />
      <div className="container-fluid">
        <div className="row">
          <div className="col meal-buttons-col">
            <RenderButtons
              mealTypes={mealTypes}
              postRecipe={postRecipe}
              auth={auth}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row recipe-card-row">
          <RenderRecipeCard
            recipes={recipes}
            postFavorite={postFavorite}
            auth={auth}
            favorites={favorites}
            deleteFavorite={deleteFavorite}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

function RenderButtons({ mealTypes, postRecipe, auth }) {
  return (
    <React.Fragment>
      {mealTypes.map((type) => (
        <Button className="meal-type-button" key={type.id}>
          <Link style={{ color: "black" }} to={`/recipes/${type.mealType}`}>
            {type.title}
          </Link>
        </Button>
      ))}
      {auth.isAuthenticated ? <AddRecipeForm postRecipe={postRecipe} /> : null}
      {auth.isAuthenticated ? (
        <Button>
          <Link to={"/favorites"}>My Favorites</Link>
        </Button>
      ) : null}
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
                    {console.log(favorites)}
                    {auth.isAuthenticated && favorites.includes(recipe._id) ? (
                      <Button onClick={() => deleteFavorite(recipe._id)}>
                        Delete Favorite
                      </Button>
                    ) : (
                      <Button onClick={() => postFavorite(recipe._id)}>
                        <i className="fa fa-star" />
                        Favorite
                      </Button>
                    )}

                    <Link
                      className="favorite-butt"
                      style={{ color: "black" }}
                    ></Link>
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
                      {auth.isAuthenticated &&
                      favorites.includes(recipe._id) ? (
                        <Button onClick={() => deleteFavorite(recipe._id)}>
                          Delete Favorite
                        </Button>
                      ) : (
                        <Button onClick={() => postFavorite(recipe._id)}>
                          <i className="fa fa-star" />
                          Favorite
                        </Button>
                      )}
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

class AddRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      recipeName: "",
      recipeDescription: "",
      recipeType: "other",
      cooktime: "",
      preptime: "",
      calories: "",
      servings: "",
      ingredients: " ",
      instructions: " ",
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  recipeSubmit(values) {
    console.log(`New Recipe: ${JSON.stringify(values)}`);
    this.props.postRecipe(
      values.recipeName,
      values.recipeDescription,
      values.recipeType,
      values.servings,
      values.calories,
      values.cooktime,
      values.preptime,
      values.ingredients,
      values.instructions
    );
    this.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        <Button className="add-recipe-butt" onClick={this.toggleModal}>
          <i className="fa fa-plus" />
          {"  "}
          Add Recipe
        </Button>
        <Modal
          centered
          contentClassName="add-recipe-modal"
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>Add Recipe</ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <Row>
                <Col>
                  <LocalForm
                    onSubmit={(values) => {
                      this.recipeSubmit(values);
                    }}
                  >
                    <Row className="form-group">
                      <Col xs={12} md={2} className="">
                        <Label
                          className="col-form-label text-center"
                          htmlFor="recipeName"
                        >
                          Name
                        </Label>
                      </Col>
                      <Col>
                        <Control.text
                          model=".recipeName"
                          id="recipeName"
                          name="recipeName"
                          className="form-control"
                          placeholder="Recipe Name"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group row">
                      <Col xs={12} md={2} className=" col-form-label">
                        <Label htmlFor="recipeDescription">Description</Label>
                      </Col>
                      <Col>
                        <Control.text
                          model=".recipeDescription"
                          id="recipeDescription"
                          name="recipeDescription"
                          className="form-control"
                          placeholder="Brief description of the recipe"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col xs={12} className="col-md-2 col-form-label">
                        <Label htmlFor="recipeType">Recipe Type:</Label>
                      </Col>
                      <Col>
                        <Control.select
                          model=".recipeType"
                          id="recipeType"
                          name="recipeType"
                          className="form-control"
                        >
                          <option>Other</option>
                          <option>Breakfast</option>
                          <option>Lunch/Dinner</option>
                          <option>Snack</option>
                          <option>Drink</option>
                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col
                        xs={3}
                        sm={2}
                        className="mb-3  mb-md-0 col-form-label"
                      >
                        <Label htmlFor="cooktime">Cooktime</Label>
                      </Col>
                      <Col xs={9} sm={10} md={4}>
                        <Control.text
                          model=".cooktime"
                          id="cooktime"
                          name="cooktime"
                          className="form-control"
                          placeholder="Cooktime in minutes"
                        />
                      </Col>

                      <Col xs={3} sm={2} className="col-form-label text-center">
                        <Label htmlFor="preptime">Preptime</Label>
                      </Col>
                      <Col xs={9} sm={10} md={4}>
                        <Control.text
                          model=".preptime"
                          id="preptime"
                          name="preptime"
                          className="form-control"
                          placeholder="Preptime in minutes"
                        />
                      </Col>
                    </Row>

                    {/*STOPPED HERE! MAKE SURE TO CHANGE THE CLASSES BC THE COMP  IS NOW COL */}
                    <Row className="form-group">
                      <Col
                        xs={3}
                        sm={2}
                        className="mb-3 mb-md-0 col-form-label"
                      >
                        {/*md={mb - 0}  */}
                        <Label htmlFor="calories">Calories</Label>
                      </Col>
                      <Col xs={9} sm={10} md={4} className="">
                        <Control.text
                          model=".calories"
                          id="calories"
                          name="calories"
                          className="form-control"
                          placeholder="Calories per serving"
                        />
                      </Col>
                      <Col
                        xs={3}
                        sm={2}
                        className="mb-3 mb-md-0 col-form-label text-center"
                      >
                        <Label htmlFor="servings">Servings</Label>
                      </Col>
                      <Col xs={9} sm={10} md={4} className="">
                        <Control.text
                          model=".servings"
                          id="servings"
                          name="servings"
                          className="form-control"
                          placeholder="Total servings"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col xs={12}>
                        <Label htmlFor="ingredients" className="col-form-label">
                          Ingredients
                        </Label>
                      </Col>
                      <Col>
                        <Control.textarea
                          model=".ingredients"
                          id="ingredients"
                          name="ingredients"
                          className="form-control"
                          rows="6"
                          placeholder="Ingredients"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col xs={12}>
                        <Label
                          htmlFor="instructions"
                          className="col-form-label"
                        >
                          Instructions
                        </Label>
                      </Col>
                      <Col>
                        <Control.textarea
                          model=".instructions"
                          id="instructions"
                          name="instructions"
                          className="form-control"
                          rows="10"
                          placeholder="instructions"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col>
                        <Button type="submit">Submit Recipe</Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default MainRecipePage;
