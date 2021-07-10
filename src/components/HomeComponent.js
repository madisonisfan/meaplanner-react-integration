import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
} from "reactstrap"; //CardTitle,  CardImg,CardText,

import { Control, LocalForm } from "react-redux-form"; // Errors

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid main-page-container">
          {/*mt-4 mt-md-6 pt-md-4 mr-2 ml-2 */}
          <div className="row main-page-row">
            <div class="col-12 col-xl-4">
              <Card className="main-page-card mr-xl-2 ">
                <CardBody>
                  <CardHeader className="card-header-main">
                    <h3>Preferences & Sensitivities</h3>
                  </CardHeader>
                  <p>
                    Don't worry if you're a picky eater or have a very sensitive
                    stomach, there will still be plenty of options for you. On
                    your page, you will be able to identify will foods to avoid.
                  </p>
                </CardBody>
              </Card>
            </div>
            <div class="col-12 col-xl-4">
              <Card className="main-page-card mr-xl-2 ml-xl-2">
                <CardBody>
                  <CardHeader className="card-header-main">
                    <h3>Add Recipes</h3>
                  </CardHeader>
                  <p>
                    Any user can contribute to our lists of recipes. You can do
                    this by uploading a recipe or filling out the form provided.
                    The feature will create endless food choices for all of us
                    to enjoy.
                  </p>
                </CardBody>
              </Card>
            </div>
            <div class="col-12 col-xl-4">
              <Card className="main-page-card ml-xl-2">
                <CardBody>
                  <CardHeader className="card-header-main">
                    <h3>Customizable Mealplan</h3>
                  </CardHeader>
                  <p>
                    You will be able to plan your meals for each meal type, for
                    the entire week. This will keep you organized and motivated.
                    The recipes will be accessible directly from your meal plan.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
          {/*row*/}

          <div className="row ">
            <div className="col-12 text-center ">
              <h2>Build A Community</h2>
              <p className="m-0">With our program you are never alone</p>
            </div>
          </div>

          <div className="row main-page-row">
            <div className="col-12 col-xl-4">
              <Card className="main-page-card mr-xl-2 ">
                <CardBody>
                  <CardHeader className="card-header-main">
                    <h3>Post</h3>
                  </CardHeader>
                  <p>
                    In the blog section, you are able to create posts. These
                    posts could be questions, advice, random thoughts, or really
                    just anything.
                  </p>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-xl-4">
              <Card className="main-page-card mr-xl-2 ml-xl-2">
                <CardBody>
                  <CardHeader className="card-header-main">
                    <h3>Message</h3>
                  </CardHeader>
                  <p>
                    You can message any user you want. Maybe you have questions
                    about something or just want to chat and connect.
                  </p>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-xl-4">
              <Card className="main-page-card ml-xl-2">
                <CardBody>
                  <CardHeader className="card-header-main">
                    <h3>Follow</h3>
                  </CardHeader>
                  <p>
                    If you find a user you really enjoy, you can toss them a
                    follow. to view posts only from those you follow, head on
                    over to your followings section.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
          <RenderGetStarted />
        </div>
        {/*container */}
      </React.Fragment>
    );
  }
}

class RenderGetStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      firstName: " ",
      lastName: " ",
      email: " ",
      password: " ",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    this.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Button className="get-started-button" onClick={this.toggleModal}>
              Get Started
            </Button>
          </div>
        </div>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Sign Up</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSignUp(values)}>
              <div className="form-group">
                <Label htmlFor="firstName">First Name</Label>
                <Control.text
                  id="firstName"
                  name="firstName"
                  model=".firstName"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="lastName">Last Name</Label>
                <Control.text
                  id="lastName"
                  name="lastName"
                  model=".lastName"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Control.text
                  id="email"
                  name="email"
                  model=".email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <Control
                  id="password"
                  name="password"
                  model=".password"
                  type="password"
                  className="form-control"
                />
              </div>
              <Button type="submit">Next</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Home;
