import React from 'react';
import {Modal, Button, Form, ButtonToolbar} from 'react-bootstrap';
import * as FIELDS from "../../constants/fields";

const AddFormModal = (props) => (
    <>
        <Modal.Header closeButton>
            <Modal.Title>Form to add a new PBL Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={props.onFormSubmit}>
                <Form.Group>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control placeholder="enter project name or team name"
                                  name={FIELDS.TITLE}
                                  value={props.formState[FIELDS.TITLE]}
                                  onChange={props.onChangeHandler}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Your short project intro</Form.Label>
                    <Form.Control as="textarea"
                                  rows={5}
                                  name={FIELDS.DESCRIPTION}
                                  placeholder="Short Intro"
                                  value={props.formState[FIELDS.DESCRIPTION]}
                                  onChange={props.onChangeHandler}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                    <Form.Label>Student Year</Form.Label>
                    <Form.Control as="select" size="sm" custom
                                  onChange={props.onChangeHandler}
                                  name={FIELDS.YEAR}
                                  value={props.formState[FIELDS.YEAR]}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>
                        <h4>Project Details</h4>
                    </Form.Label>
                    <Form.Control as="textarea"
                                  rows={5}
                                  placeholder="Problem Description!
What problem is suppose to solve your project idea ? "
                                  name={FIELDS.PROBLEM_DESCRIPTION}
                                  value={props.formState[FIELDS.PROBLEM_DESCRIPTION]}
                                  onChange={props.onChangeHandler}
                    />
                    <br/>
                    <Form.Control as="textarea"
                                  rows={7}
                                  placeholder="The theory details section!
Describes the theoretical parts of your project
Examples: Info about formulas, computations, statistics which u used at implementation "
                                  name={FIELDS.THEORY_DESCRIPTION}
                                  value={props.formState[FIELDS.THEORY_DESCRIPTION]}
                                  onChange={props.onChangeHandler}
                    />
                    <br/>
                </Form.Group>
                <Form.File type="file"
                           id="custom-file"
                           label="Upload a background image for your PBL project page"
                           custom
                           onChange={props.onImageChange}
                />
                <br/><br/>
                <Form.File type="file"
                           id="custom-file"
                           label="Upload the FULL pdf report of your PBL project"
                           custom
                           onChange={props.onPdfReportChange}
                />
                <br/><br/>
                <ButtonToolbar className="justify-content-between"
                               aria-label="Toolbar with Button groups">
                    <Button type="submit"
                            variant="outline-success"
                            disabled={props.loading}
                    >
                        Submit Form
                    </Button>
                    <Button variant="outline-danger"
                            onClick={props.hideModal}>
                        Close Form
                    </Button>
                </ButtonToolbar>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            Your are almost done!
        </Modal.Footer>
    </>
)

export default AddFormModal;