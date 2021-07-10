import React, { Component } from "react";
import {
  Jumbotron,
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap"; //NavbarBrand,
import { NavLink } from "react-router-dom";

function MainHeader(props) {
  return (
    <React.Fragment>
      <Jumbotron fluid>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col ml-4">
              <h1>Meal Planner</h1>
            </div>
          </div>
        </div>
      </Jumbotron>
      <MainNav />
    </React.Fragment>
  );
}

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  render() {
    return (
      <Navbar light sticky="top" expand="md">
        <div className="container-fluid">
          <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/recipes/allRecipes">
                  Recipes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/mealplan">
                  Mealplan
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/yourpage">
                  Your Page
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default MainHeader;
