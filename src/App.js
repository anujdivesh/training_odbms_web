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

function App() {

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

  return (
    <div className="App">
      
      <Router>
            <div>
        <Navbar expand="lg" bg={"navbar navbar-expand-sm navbar-custom"} variant={"dark"} style={{paddingRight:"1%",paddingLeft:"1%"}}>
        
        <img src={require('./assets/images/spx.png')} alt='logo' style={{marginLeft:'-0.7%',marginTop:'-0.7%',marginBottom:'-0.7%', width:"90px", height:"50px"}}/>
        <Navbar.Brand as={Link} to={"/oceandata"}>
          
          &nbsp;Ocean Data Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/oceandata"}>Home</Nav.Link>
            {showAdminBoard && (
           <Nav.Link as={Link} to={"/oceandata/add"}>Add</Nav.Link>
          )}

            
           {/*<Nav.Link as={Link} to={"/oceandata/search"}>Request</Nav.Link>*/}
          </Nav>
          {currentUser ? (
             <Form inline="true">
             <Button variant="warning" className="mr-sm-4" as={Link} to={"/oceandata/login"} onClick={logOut}>{username}:Logout</Button>
           </Form>
         
        ) : (
          <Form inline="true">
            <Button style={{color:'#215E95'}} variant="warning" className="mr-sm-4" as={Link} to={"/oceandata/login"}>Login</Button>&nbsp;
            <Button style={{color:'#215E95'}} variant="warning" className="mr-sm-2" as={Link} to={"/oceandata/signup"} >Sign up!</Button>
          </Form>
          )}
        </Navbar.Collapse>
    </Navbar>
            </div>
            <div>

            <Routes>
            <Route path="/oceandata/home" element={<Home/>} />
          <Route path="/oceandata/add" element={<Add/>} />
          <Route path="/oceandata/search" element={<Search/>} />
          <Route path="/oceandata/login" element={<Login/>} />
          <Route path="/oceandata/signup" element={<Signup/>} />
          <Route path="/oceandata" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
            </div>
  </Router>
    </div>
  );
}

export default App;