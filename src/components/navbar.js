import "./navbar.css"
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

const logout = async (e)=>{
  localStorage.setItem("salesToken",null);
  localStorage.setItem("username",null);
  window.location = "/";
};

function NavBar(){
  let username = (localStorage.getItem('username'));
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Container>
  <Navbar.Brand href="/dashboard">Fatmug Designs | Hey {username}!</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    </Nav>
    <Nav>
      <Nav.Link href="/create">Write</Nav.Link>
      <Nav.Link href="/submittedArticles">Your Articles</Nav.Link>  
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  );
}


export default NavBar;