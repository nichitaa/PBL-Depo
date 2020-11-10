import React from 'react';
import {NavLink} from "react-router-dom";

import {Navbar, Nav, NavDropdown, Modal, Button} from 'react-bootstrap';
import AddFormContainer from "../ProjectForm/AddFormContainer";
import * as ROUTES from "../../constants/routes";


const PBLNavBar = (props) => {

    return (
        <>
            <Navbar bg="light" expand="xl">
                <Navbar.Brand as={NavLink}
                              to={ROUTES.HOME}>
                    PBL DEPO
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink}
                                  to={ROUTES.CATALOGUE}
                        >
                            PBL Catalogue
                        </Nav.Link>
                        <Nav.Link as={NavLink}
                                  to={ROUTES.ABOUT_US}
                        >
                            About Us
                        </Nav.Link>
                        {/*  todo: Fix -> bug with drop down menu:
                            After opening and closing a modal and
                            again opening the dropdown and closing it by
                            clicking outside it, it will not open anymore
                          */}
                        <NavDropdown title="More"
                                     id="nav-dropdown">
                            <NavDropdown.Item>PBL Guide</NavDropdown.Item>
                            <NavDropdown.Item>PBL Achievements</NavDropdown.Item>
                            <NavDropdown.Item>Mentors</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={props.handleShowFormModal}>
                                Add new Project Form
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {
                        !props.currentUser ? (
                                <>
                                    <Nav className="justify-content-end">
                                        <Nav.Item>
                                            <Nav.Link as={NavLink} to={ROUTES.SIGN_UP}>
                                                <Button variant="outline-primary">Sign Up</Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={NavLink} to={ROUTES.LOG_IN}>
                                                <Button variant="outline-warning">LogIn</Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </>
                            )
                            : (
                                <>
                                    <Nav className="justify-content-end">
                                        <Nav.Item>
                                            <Nav.Link as={NavLink}
                                                      to={ROUTES.USER}>
                                                <Button variant="outline-dark">
                                                    Me: {props.currentUser.email}
                                                </Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link>
                                                <Button variant="outline-warning"
                                                        onClick={props.handleLogout}>Log Out</Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </>
                            )
                    }
                </Navbar.Collapse>
            </Navbar>

            <Modal
                size={"lg"}
                show={props.showAddForm}
                onHide={() => props.setShowAddForm(false)}
                backdrop="static"
                keyboard={false}
            >
                <AddFormContainer hideModal={props.hideModal}/>
            </Modal>
        </>
    )
};
export default PBLNavBar;