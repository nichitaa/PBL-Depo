import React from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Modal, Button, Form, InputGroup, FormControl, Col} from 'react-bootstrap';
import {BsSearch} from "react-icons/bs";
import AddFormContainer from "../containers/AddFormContainer";
import * as ROUTES from "../../constants/routes";
import 'bootstrap/dist/css/bootstrap.min.css';


const PBLNavBar = (props) => (
    <>
        <Navbar expand="xl">
            <Navbar.Brand as={NavLink}
                          to={ROUTES.HOME}>
                PBL DEPO
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
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
                            Upload New Project
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                {
                    !props.currentUser ? (
                            <>
                                <Nav className="justify-content-end">
                                    <Nav.Item>
                                        <Nav.Link as={NavLink} to={ROUTES.SIGN_UP}>
                                            <Button variant="outline-danger"
                                                    style={{borderRadius: "50px"}}>
                                                Sign Up
                                            </Button>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={NavLink} to={ROUTES.LOG_IN}>
                                            <Button variant="outline-success"
                                                    style={{borderRadius: "50px"}}>
                                                Log In
                                            </Button>
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
                                            <Button variant="outline-info"
                                                    style={{borderRadius: "50px"}}>
                                                {props.currentUser.email}
                                            </Button>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link>
                                            <Button variant="outline-danger"
                                                    style={{borderRadius: "50px"}}
                                                    onClick={props.handleLogout}>
                                                Sign Out
                                            </Button>
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

export default PBLNavBar;