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

function RecipeDetails({ recipe }) {
  console.log("recipe", recipe.recipeName);
  return (
    <React.Fragment>
      <PageTitleComponent title={recipe.recipeName} />
      <div className="container-fluid">
        <Row>
          <Col xs={12} style={{ textAlign: "center" }}>
            Created by: {recipe.recipeCreator.username}
          </Col>
          <Row
            className="justify-content-center"
            style={{ width: "100%", marginTop: "15px" }}
          >
            <Col xs={3} style={{ textAlign: "center" }}>
              Cooktime: {recipe.cooktime}
            </Col>
            <Col xs={3} style={{ textAlign: "center" }}>
              Preptime: {recipe.preptime}
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ width: "100%" }}>
            <Col xs={3} style={{ textAlign: "center" }}>
              Servings: {recipe.servings}
            </Col>
            <Col xs={3} style={{ textAlign: "center" }}>
              Calories: {recipe.calories}
            </Col>
            <Row
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "30px",
                height: "200px",
              }}
            >
              <Col xs={12}>
                <h4>Ingredients</h4>
              </Col>
              <Col>{recipe.ingredients}</Col>
            </Row>
            <Row
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "30px",
                height: "400px",
              }}
            >
              <Col xs={12}>
                <h4>Instructions</h4>
              </Col>
              <Col>{recipe.instructions}</Col>
            </Row>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default RecipeDetails;
