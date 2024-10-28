import React, {Component} from "react";
import '../css/nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "../pages/home";
import Add from "../pages/add";
//import Login from "../pages/login";
import Search from "../pages/search";
//import Signup from "../pages/signup";
import Login from '../pages/login';
import Signup from '../pages/signup';
//import AuthService from "../services/auth.service";

//import EventBus from "../common/EventBus";
export default class NavbarComp extends Component {
  
    render (){
        return(
          
            <Router>
            <div>
        <Navbar expand="lg" bg={"navbar navbar-expand-sm navbar-custom"} variant={"dark"} style={{paddingRight:"1%",paddingLeft:"1%"}}>
        <Navbar.Brand as={Link} to={"/exploredata"}>Ocean Data Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/exploredata"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/exploredata/add"}>Add</Nav.Link>
            <Nav.Link as={Link} to={"/exploredata/search"}>Search</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline="true">
            <Button variant="warning" className="mr-sm-4" as={Link} to={"/exploredata/login"}>Login</Button>&nbsp;
            <Button variant="warning" className="mr-sm-2" as={Link} to={"/exploredata/signup"} >Sign up!</Button>
          </Form>
        </Navbar.Collapse>
    </Navbar>
            </div>
            <div>

            <Routes>
            <Route path="/exploredata/home" element={<Home/>} />
          <Route path="/exploredata/add" element={<Add/>} />
          <Route path="/exploredata/search" element={<Search/>} />
          <Route path="/exploredata/login" element={<Login/>} />
          <Route path="/exploredata/signup" element={<Signup/>} />
          <Route path="/exploredata" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
            </div>
  </Router>
        )
    }
}