import React from 'react';
import {Modal, Button, Form, ButtonToolbar} from 'react-bootstrap';

const AddFormModal = (props) => {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Form to add a new PBL Project</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={props.onFormSubmit}>
                    <Form.Group>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control placeholder="enter project name or team name"
                                      name="projectName"
                                      value={props.formState.projectName}
                                      onChange={props.onChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Your short project intro</Form.Label>
                        <Form.Control as="textarea"
                                      rows={5}
                                      name="projectDescription"
                                      placeholder="Short Intro"
                                      value={props.formState.projectDescription}
                                      onChange={props.onChangeHandler}
                        />
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
                                      name="projectProblemDescription"
                                      value={props.formState.projectProblemDescription}
                                      onChange={props.onChangeHandler}
                        />
                        <br/>
                        <Form.Control as="textarea"
                                      rows={7}
                                      placeholder="The theory details section!
Describes the theoretical parts of your project
Examples: Info about formulas, computations, statistics which u used at implementation "
                                      name="projectTheoryDescription"
                                      value={props.formState.projectTheoryDescription}
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
                Some cool text for modal footer
            </Modal.Footer>
        </>
    );
}

export default AddFormModal;