import React, { useState, useEffect }from 'react'
import axios from 'axios'
import {
  Link
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';


import List from './List'
import Buy from './Buy'

const Header = ({ user }) => {  

  const logOut = async () => {
      const { data } = await axios.post('/account/logout')
  }

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
        University of Pennsylvania
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {(user) && (
            <>
              <Nav.Link href="/me">My Swipes</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {(user) && (
            <>
              <Navbar.Text>
                <b>Signed in as: {user.username}</b>
              </Navbar.Text>
              <Nav.Link href="/login" onClick={ logOut }>(Sign out)</Nav.Link>
            </>
          )}
          {(!user) && (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header