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
} from "reactstrap";
import classnames from "classnames";

function MainMealplanPage({ userMealplan }) {
  return (
    <React.Fragment>
      <PageTitleComponent title="Mealplan" />
      <div className="container-fluid mealplan-container">
        <RenderEachDay mealplan={userMealplan.userMealplan} />
      </div>
    </React.Fragment>
  );
}

function RenderEachDay({ mealplan }) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fullMealplan = mealplan.map((day) => {
    return (
      <Row className="mealplan-day-row">
        <Col xs={12}>
          <h4 className="mb-4">{day.date}</h4>
        </Col>
        <Col xs={12}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Breakfast" })}
                onClick={() => {
                  toggle("Breakfast");
                }}
              >
                Breakfast
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "LunchDinner" })}
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
            <TabPane tabId="Breakfast">
              <Media>
                <img
                  className="d-flex mealplan-recipe-img "
                  src={day.breakfast.image}
                />
                <Media body>
                  <h5>{day.breakfast.recipeName}</h5>
                  <p>There will be a brief description here</p>
                  <RenderEditButton />
                </Media>
              </Media>
            </TabPane>
            <TabPane tabId="LunchDinner">
              <Media>
                <img
                  className="d-flex mealplan-recipe-img "
                  src={day.lunchDinner.image}
                />
                <Media body>
                  <h5>{day.lunchDinner.recipeName}</h5>
                  <p>There will be a brief description here</p>
                  <RenderEditButton />
                </Media>
              </Media>
            </TabPane>
          </TabContent>
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
          Change Recipe
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Favorites</ModalHeader>
        </Modal>
      </React.Fragment>
    );
  }
}

export default MainMealplanPage;
