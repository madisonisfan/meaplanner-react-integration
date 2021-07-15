import React, { useState, Component } from "react";
import PageTitleComponent from "./PageTitleComponent";
import {
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Input,
} from "reactstrap";
import classnames from "classnames";
import { baseUrl } from "../shared/baseUrl";

function MainMealplanPage({ userMealplan, favorites }) {
  return (
    <React.Fragment>
      <PageTitleComponent title="Mealplan" />
      <div className="container-fluid mx-auto mealplan-container">
        <RenderEachDay
          mealplan={userMealplan.userMealplan}
          favorites={favorites}
        />
      </div>
    </React.Fragment>
  );
}

function RenderEachDay({ mealplan, favorites }) {
  const [activeTab, setActiveTab] = useState("Breakfast");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fullMealplan = mealplan.map((day) => {
    return (
      <Row className="mealplan-day-row mx-auto">
        <Col md={12}>
          <Row>
            <Col xs={12}>
              <h4 className="mb-4">{day.date}</h4>
            </Col>
            <Col xs={12}>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "Breakfast",
                    })}
                    onClick={() => {
                      toggle("Breakfast");
                    }}
                  >
                    Breakfast
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "LunchDinner",
                    })}
                    onClick={() => {
                      toggle("LunchDinner");
                    }}
                  >
                    Lunch/Dinner
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "Snacks" })}
                    onClick={() => {
                      toggle("Snacks");
                    }}
                  >
                    Snacks
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "Drinks" })}
                    onClick={() => {
                      toggle("Drinks");
                    }}
                  >
                    Drinks
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="mealplan-box">
                <TabPane tabId="Breakfast" className="tab-pane-style">
                  <Media>
                    <img
                      className="d-flex mealplan-recipe-img "
                      src={day.breakfast.image}
                    />
                    <Media body>
                      <h5>{day.breakfast.recipeName}</h5>
                      <p>There will be a brief description here</p>
                      <RenderEditButton
                        favorites={favorites}
                        editOrAdd="Edit"
                      />
                    </Media>
                  </Media>
                </TabPane>
                <TabPane tabId="LunchDinner" className="tab-pane-style">
                  <Media>
                    <img
                      className="d-flex mealplan-recipe-img "
                      src={day.lunchDinner.image}
                    />
                    <Media body>
                      <h5>{day.lunchDinner.recipeName}</h5>
                      <p>There will be a brief description here</p>
                      <RenderEditButton
                        favorites={favorites}
                        editOrAdd="Edit"
                      />
                    </Media>
                  </Media>
                </TabPane>
                <TabPane tabId="Snacks" className="tab-pane-style">
                  <p style={{ textAlign: "center", marginTop: "25px" }}>
                    {" "}
                    No meal selected.
                  </p>
                  <RenderEditButton favorites={favorites} editOrAdd="Add" />
                </TabPane>
                <TabPane tabId="Drinks" className="tab-pane-style">
                  <p style={{ textAlign: "center", marginTop: "25px" }}>
                    {" "}
                    No meal selected.
                  </p>
                  <RenderEditButton favorites={favorites} editOrAdd="Add" />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  });

  return <React.Fragment>{fullMealplan}</React.Fragment>;
}

class RenderEditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <React.Fragment>
        <Button
          className="edit-mealplan-recipe-butt"
          onClick={this.toggleModal}
        >
          {this.props.editOrAdd === "Edit" ? "Change Recipe" : "Add Recipe"}
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Favorites</ModalHeader>
          <ModalBody className="p-0">
            <div className="container-fluid">
              <RenderFavorites favorites={this.props.favorites} />

              <Row className="mb-3">
                <Col className="text-center">
                  <Button>Done</Button>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderFavorites({ favorites }) {
  console.log(favorites);
  if (favorites) {
    return (
      <React.Fragment>
        {favorites.map((favorite) => {
          return (
            <React.Fragment>
              <Row className="mb-3 mt-3">
                <Col>
                  <Card>
                    <Media>
                      <Media left>
                        <img
                          className="d-flex recipe-img-sm"
                          src={baseUrl + favorite.imageUrl}
                        />
                      </Media>

                      <Media body className="recipe-sm-body">
                        <Row>
                          <Col xs={12}>
                            <h5>{favorite.recipeName}</h5>
                          </Col>
                          <Col xs={12}>
                            <p>{favorite.recipeDescription}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            xs={12}
                            className="pl-6"
                            style={{ float: "right" }}
                          >
                            <Input
                              type="radio"
                              name="selectedMeal"
                              className="ml-auto"
                            />
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  } else {
    <p>You have no favorites</p>;
  }
}

export default MainMealplanPage;
