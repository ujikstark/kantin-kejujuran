import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import SigninModal from './SigninModal';
import SignupModal from './SignUpModal';



function NavigationBar() {

    const auth = false;

    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="md" className={'sticky-top py-3'}>
            <Container>
                <Nav.Link to="/" style={{ textDecoration: 'none' }}>
                    <Navbar.Brand className="py-3">Kantin Kejujuran</Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    {auth 
                        ? <>
                            <Nav className="ms-auto">
                                <Nav.Link to="/me">
                                    <Navbar.Text className="btn btn-link" as="span">
                                        My profile
                                    </Navbar.Text>
                                </Nav.Link>
                                <Navbar.Text className="btn btn-link">Logout</Navbar.Text>
                            </Nav>
                        </>
                        : <>
                            <Nav className="ms-auto">
                                <SigninModal/>
                                <SignupModal/>
                            </Nav>
                        </>
                    }
                    
                </Navbar.Collapse>
            </Container>
            
      </Navbar>
    );
}


export default NavigationBar;