import './App.css';
import React, {useEffect, useState} from "react";
import './css/nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "./pages/home";
import Add from "./pages/add";
import Search from "./pages/search";
import Login from './pages/login';
import Signup from './pages/signup';
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import AddDataSet from './pages/addDataSet';
import config from './pages/config.json';

function App() {

const apiUrl = config.api.baseUrl;

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    //const user = AuthService.getCurrentUser();
    const user = AuthService.getCurrentUserCookie();
    if (user) {
      setCurrentUser(user);
      var tempemail = user.email
      var split = tempemail.split('@');
      setUsername(split[0])
      setShowAdminBoard(user.roles.includes("ROLE_ADMINEYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9EYJLBWFPBCI6IM"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    
  };

  const handleRedirect = () => {
    window.open(`${apiUrl}/dbms/admin`, '_blank', 'noopener,noreferrer');
};


  return (
    <div className="App">
      
      <Router>
            <div>
        <Navbar expand="lg" bg={"navbar navbar-expand-sm navbar-custom"} variant={"dark"} style={{paddingRight:"1%",paddingLeft:"1%"}}>
        
        <img src={require('./assets/images/TV.png')} alt='logo' style={{marginLeft:'-0.7%',marginTop:'-0.5%',marginBottom:'-0.5%', width:"90px", height:"48px"}}/>
        <Navbar.Brand as={Link} to={"/exploredata"}>
          
          &nbsp; Data Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/exploredata"}>Home</Nav.Link>

            
           {/*<Nav.Link as={Link} to={"/exploredata/search"}>Request</Nav.Link>*/}
          </Nav>
          {currentUser ? (
             <Form inline="true">
             <Button variant="warning" className="mr-sm-4" as={Link} to={"/exploredata/login"} onClick={logOut}>{username}:Logout</Button>
           </Form>
         
        ) : (
          <Form inline="true">
            <Button style={{color:'#215E95'}} variant="warning" className="mr-sm-4" as={Link} onClick={handleRedirect}>Login!</Button>
          </Form>
          )}
        </Navbar.Collapse>
    </Navbar>
            </div>
            <div>

            <Routes>
            <Route path="/exploredata/home" element={<Home/>} />
          <Route path="/exploredata/login" element={<Login/>} />
          <Route path="/exploredata" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
            </div>
  </Router>
    </div>
  );
}

export default App;